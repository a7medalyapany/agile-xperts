CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = 'public'
AS $$
DECLARE
  provider text;
  name text;
  user_name text;
  user_email text;
  user_avatar_url text;
BEGIN
  -- Determine the provider
  provider := NEW.raw_app_meta_data->>'provider';
  
  -- Log the provider for debugging
  RAISE INFO 'Provider: %', provider;

  -- Set values based on the provider
  IF provider = 'github' THEN
    name := NEW.raw_user_meta_data->>'name';
    user_name := NEW.raw_user_meta_data->>'user_name';
    user_email := NEW.raw_user_meta_data->>'email';
    user_avatar_url := NEW.raw_user_meta_data->>'avatar_url';
  ELSIF provider = 'email' THEN
    name := NEW.raw_user_meta_data->>'name';
    user_name := NEW.raw_user_meta_data->>'username';
    user_email := NEW.raw_user_meta_data->>'email';
    user_avatar_url := NEW.raw_user_meta_data->>'avatar_url';
  ELSE
    -- Handle other providers or default case if needed
    name := 'Unknown';
    user_name := 'Unknown';
    user_email := 'unknown@provider.com';
    user_avatar_url := NULL;
  END IF;

  -- Log the values for debugging
  RAISE INFO 'Name: %, Username: %, Email: %, Avatar URL: %', name, user_name, user_email, user_avatar_url;

  -- Insert into the profile table
  INSERT INTO public.profile (
    id, name, username, email, avatar_url
  ) VALUES (
    NEW.id,
    name,
    user_name,
    user_email,
    user_avatar_url
  );

  -- Insert into user_role and user_level tables
  INSERT INTO public.user_role(user_id)
  VALUES (NEW.id);

  INSERT INTO public.user_level(user_id)
  VALUES (NEW.id);

  -- Insert GitHub profile link into social_media table if the provider is GitHub
  IF provider = 'github' THEN
    INSERT INTO public.social_media (user_id, platform, account_link)
    VALUES (NEW.id, 'GitHub', 'https://github.com/' || user_name);
  END IF;

  -- Return the new record
  RETURN NEW;

EXCEPTION
  WHEN others THEN
    -- Raise an exception with the error message
    RAISE EXCEPTION 'Error occurred: %', SQLERRM;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();


create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
  declare
    claims jsonb;
    user_role public.app_role;
  begin
    -- Check if the user is marked as admin in the profiles table
    select role into user_role from public.user_role where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;

grant usage on schema public to supabase_auth_admin;

grant execute
  on function public.custom_access_token_hook
  to supabase_auth_admin;

revoke execute
  on function public.custom_access_token_hook
  from authenticated, anon;

grant all
  on table public.user_role
to supabase_auth_admin,authenticated,anon;



CREATE FUNCTION public.authorize(
  requested_permission app_permission
)
RETURNS BOOLEAN AS $$
DECLARE
  bind_permissions INT;
BEGIN
  SELECT COUNT(*)
  INTO bind_permissions
  FROM public.role_permissions
  WHERE role_permissions.permission = requested_permission
    AND role_permissions.role = (
      SELECT role
      FROM public.user_role
      WHERE user_id = auth.uid()
      LIMIT 1
    );

  RETURN bind_permissions > 0;  
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;



CREATE OR REPLACE FUNCTION insert_member_on_request_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'accepted' AND OLD.status = 'pending' THEN
    INSERT INTO public.member(user_id, team_id, tech_id)
    VALUES (NEW.user_id, NEW.team_id, NEW.tech_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_insert_member_on_request_status_change
AFTER UPDATE ON request
FOR EACH ROW
WHEN (OLD.status = 'pending' AND NEW.status = 'accepted')
EXECUTE FUNCTION insert_member_on_request_status_change();



CREATE OR REPLACE FUNCTION handle_project_submission (
  _name TEXT,
  _description TEXT,
  _img_url TEXT,
  _owner_id UUID,
  _is_private BOOLEAN,
  _repo_name TEXT,
  _github_repo_url TEXT,
  _team_name TEXT,
  _technologies JSONB
) RETURNS BIGINT AS $$
DECLARE
    _project_id BIGINT;
    _team_id BIGINT;
    _tech_id BIGINT;
    tech JSONB;
BEGIN
    -- Insert project data
    INSERT INTO project (owner_id, title, description, is_private, repo_name, img_url, github_repo_url)
    VALUES (_owner_id, _name, _description, _is_private, _repo_name, _img_url, _github_repo_url)
    RETURNING id INTO _project_id;

    -- Insert team data
    INSERT INTO team (project_id, name)
    VALUES (_project_id, _team_name)
    RETURNING id INTO _team_id;

    -- Insert member with default tech ID 1
    INSERT INTO member (user_id, team_id, tech_id)
    VALUES (_owner_id, _team_id, 1);

    -- Insert technologies
    FOR tech IN SELECT * FROM jsonb_array_elements(_technologies) LOOP
        INSERT INTO technology (name, designation)
        VALUES (tech->>'name', tech->>'designation')
        ON CONFLICT DO NOTHING
        RETURNING id INTO _tech_id;

        -- Insert stack
        INSERT INTO stack (project_id, tech_id)
        VALUES (_project_id, _tech_id);
    END LOOP;

    RETURN _project_id;
END;
$$ LANGUAGE plpgsql;

-- Restrict execute permissions
REVOKE EXECUTE ON FUNCTION handle_project_submission FROM PUBLIC;
GRANT EXECUTE ON FUNCTION handle_project_submission TO postgres;



CREATE OR REPLACE FUNCTION call_handle_project_submission (
  _name TEXT,
  _description TEXT,
  _img_url TEXT,
  _owner_id UUID,
  _is_private BOOLEAN,
  _repo_name TEXT,
  _github_repo_url TEXT,
  _team_name TEXT,
  _technologies JSONB
) RETURNS BIGINT AS $$
DECLARE
    _project_id BIGINT;
BEGIN
    -- Check if the current user is authenticated
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'Access denied. You must be authenticated to access this function.';
    END IF;

    -- Check if the current user has the 'pro' role
    IF EXISTS (SELECT 1 FROM public.user_role WHERE user_id = auth.uid() AND role = 'pro') THEN
        -- Allow access for users with the 'pro' role
        -- Call the handle_project_submission function and get the project_id
        _project_id := handle_project_submission(_name, _description, _img_url, _owner_id, _is_private, _repo_name, _github_repo_url, _team_name, _technologies);
        RAISE NOTICE 'Function executed successfully by a user with the ''pro'' role.';
        RETURN _project_id;
    ELSE
        -- Deny access for users with the 'normal' role
        RAISE EXCEPTION 'Access denied. You do not have permission to access this function.';
    END IF;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER; -- Ensures the function runs with the privileges of the user who created it


-- Create trigger function to enforce row limit
CREATE OR REPLACE FUNCTION check_row_limit_on_social_media()
RETURNS TRIGGER AS
$$
DECLARE
    row_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO row_count
    FROM social_media
    WHERE user_id = NEW.user_id;

    IF row_count >= 8 THEN
        RAISE EXCEPTION 'Cannot insert more than 8 rows per user';
    END IF;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Create trigger to call the trigger function before insertion
CREATE TRIGGER enforce_row_limit
BEFORE INSERT ON public.social_media
FOR EACH ROW
EXECUTE FUNCTION check_row_limit_on_social_media();




CREATE OR REPLACE FUNCTION get_last_project_details()
RETURNS TABLE (
    project_id BIGINT,
    project_title VARCHAR,
    project_description VARCHAR,
    is_private BOOLEAN,
    repo_name VARCHAR,
    project_img_url TEXT,
    github_repo_url TEXT,
    project_created_at TIMESTAMPTZ,
    project_updated_at TIMESTAMPTZ,
    team_members JSONB,
    stack JSONB,
    project_owner JSONB
) AS $$
BEGIN
    RETURN QUERY
    WITH latest_member_project AS (
        SELECT 
            m.team_id,
            m.user_id,
            t.project_id,
            ROW_NUMBER() OVER (PARTITION BY m.user_id ORDER BY m.joined_at DESC) AS row_num
        FROM 
            public.member m
        JOIN 
            public.team t ON m.team_id = t.id
        WHERE 
            m.user_id = auth.uid()
    )
    SELECT 
        p.id AS project_id,
        p.title AS project_title,
        p.description AS project_description,
        p.is_private,
        p.repo_name,
        p.img_url AS project_img_url,
        p.github_repo_url,
        p.created_at AS project_created_at,
        p.update_at AS project_updated_at,
        jsonb_agg(DISTINCT jsonb_build_object(
            'user_id', u.id,
            'name', u.name,
            'username', u.username,
            'email', u.email,
            'avatar_url', u.avatar_url,
            'tech_id', t.id,
            'tech_name', t.name,
            'tech_designation', t.designation
        )) AS team_members,
        jsonb_agg(DISTINCT jsonb_build_object(
            'id', tech.id,
            'name', tech.name,
            'designation', tech.designation
        )) AS stack,
        jsonb_build_object(
            'user_id', owner.id,
            'name', owner.name,
            'username', owner.username,
            'email', owner.email,
            'avatar_url', owner.avatar_url
        ) AS project_owner
    FROM 
        latest_member_project lmp
    JOIN 
        public.project p ON lmp.project_id = p.id
    JOIN 
        public.team tm ON tm.project_id = p.id
    JOIN 
        public.member m ON m.team_id = tm.id
    JOIN 
        public.profile u ON u.id = m.user_id
    LEFT JOIN 
        public.stack s ON s.project_id = p.id
    LEFT JOIN 
        public.technology tech ON tech.id = s.tech_id
    LEFT JOIN 
        public.technology t ON t.id = m.tech_id
    LEFT JOIN 
        public.profile owner ON owner.id = p.owner_id
    WHERE 
        lmp.row_num = 1 AND
        EXISTS (
            SELECT 1 
            FROM public.member 
            WHERE team_id = lmp.team_id AND user_id = auth.uid()
        )
    GROUP BY 
        p.id, owner.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION get_project_details_by_id(project_id_param BIGINT)
RETURNS TABLE (
    project_id BIGINT,
    project_title VARCHAR,
    project_description VARCHAR,
    is_private BOOLEAN,
    repo_name VARCHAR,
    project_img_url TEXT,
    github_repo_url TEXT,
    project_created_at TIMESTAMPTZ,
    project_updated_at TIMESTAMPTZ,
    team_members JSONB,
    stack JSONB,
    project_owner JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id AS project_id,
        p.title AS project_title,
        p.description AS project_description,
        p.is_private,
        p.repo_name,
        p.img_url AS project_img_url,
        p.github_repo_url,
        p.created_at AS project_created_at,
        p.update_at AS project_updated_at,
        jsonb_agg(DISTINCT jsonb_build_object(
            'user_id', u.id,
            'name', u.name,
            'username', u.username,
            'email', u.email,
            'avatar_url', u.avatar_url,
            'tech_id', t.id,
            'tech_name', t.name,
            'tech_designation', t.designation
        )) AS team_members,
        jsonb_agg(DISTINCT jsonb_build_object(
            'id', tech.id,
            'name', tech.name,
            'designation', tech.designation
        )) AS stack,
        jsonb_build_object(
            'user_id', owner.id,
            'name', owner.name,
            'username', owner.username,
            'email', owner.email,
            'avatar_url', owner.avatar_url
        ) AS project_owner
    FROM 
        public.project p
    JOIN 
        public.team tm ON tm.project_id = p.id
    JOIN 
        public.member m ON m.team_id = tm.id
    JOIN 
        public.profile u ON u.id = m.user_id
    LEFT JOIN 
        public.stack s ON s.project_id = p.id
    LEFT JOIN 
        public.technology tech ON tech.id = s.tech_id
    LEFT JOIN 
        public.technology t ON t.id = m.tech_id
    LEFT JOIN 
        public.profile owner ON owner.id = p.owner_id
    WHERE 
        p.id = project_id_param
        AND EXISTS (
            SELECT 1
            FROM public.member m2
            WHERE m2.team_id = tm.id
            AND m2.user_id = auth.uid()
        )
    GROUP BY 
        p.id, owner.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- Function to get all the users who have requested to join a team
CREATE OR REPLACE FUNCTION get_detailed_requests(proj_id bigint)
RETURNS TABLE (
    user_id uuid,
    sender_name text,
    sender_username text,
    sender_email varchar,
    sender_avatar_url text,
    tech_id bigint,
    tech_name text,
    tech_designation varchar,
    team_id bigint,
    request_status public.request_status
) SECURITY DEFINER AS $$
BEGIN
    -- Check if the current user is the owner of the project
    IF (SELECT owner_id FROM public.project WHERE id = proj_id) = auth.uid() THEN
        RETURN QUERY
        WITH team_ids AS (
            SELECT id
            FROM public.team
            WHERE project_id = proj_id
        ),
        request_data AS (
            SELECT 
                r.user_id, 
                r.tech_id, 
                r.team_id, 
                r.status
            FROM public.request r
            JOIN team_ids t ON r.team_id = t.id
            WHERE r.status = 'pending'
        ),
        detailed_requests AS (
            SELECT 
                rd.user_id,
                p.name AS sender_name,
                p.username AS sender_username,
                p.email AS sender_email,
                p.avatar_url AS sender_avatar_url,
                rd.tech_id,
                t.name AS tech_name,
                t.designation AS tech_designation,
                rd.team_id,
                rd.status AS request_status
            FROM request_data rd
            JOIN public.profile p ON rd.user_id = p.id
            JOIN public.technology t ON rd.tech_id = t.id
        )
        SELECT *
        FROM detailed_requests;
    ELSE
        RAISE EXCEPTION 'You are not authorized to execute this function';
    END IF;
END;
$$ LANGUAGE plpgsql;





CREATE OR REPLACE FUNCTION accept_request(user_id_param uuid, team_id_param bigint, tech_id_param bigint)
RETURNS void AS $$
BEGIN
    -- Check if the current user is the owner of the project associated with the request
    IF (SELECT owner_id 
        FROM public.project 
        WHERE id = (SELECT project_id 
                    FROM public.team 
                    WHERE id = team_id_param)) = auth.uid() THEN
        -- Update the request status to 'accepted'
        UPDATE public.request
        SET status = 'accepted'
        WHERE user_id = user_id_param AND team_id = team_id_param AND tech_id = tech_id_param;
    ELSE
        RAISE EXCEPTION 'You are not authorized to accept this request';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION reject_request(user_id_param uuid, team_id_param bigint, tech_id_param bigint)
RETURNS void AS $$
BEGIN
    -- Check if the current user is the owner of the project associated with the request
    IF (SELECT owner_id 
        FROM public.project 
        WHERE id = (SELECT project_id 
                    FROM public.team 
                    WHERE id = team_id_param)) = auth.uid() THEN
        -- Update the request status to 'accepted'
        UPDATE public.request
        SET status = 'rejected'
        WHERE user_id = user_id_param AND team_id = team_id_param AND tech_id = tech_id_param;
    ELSE
        RAISE EXCEPTION 'You are not authorized to reject this request';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION public.delete_member(p_user_id uuid, p_team_id bigint)
RETURNS void
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM public.member
    WHERE user_id = p_user_id
    AND team_id = p_team_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Member not found for user_id: % and team_id: %', p_user_id, p_team_id;
    END IF;
END;
$$;




CREATE OR REPLACE FUNCTION notify_on_like()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.notification (user_id, related_user_id, related_post_id, notification_type, is_read, created_at)
    VALUES (
        NEW.user_id,         -- related_user_id is the user who made the like
        (SELECT user_id FROM public.post WHERE id = NEW.post_id),  -- user_id is the owner of the post
        NEW.post_id,         -- related_post_id is the post that was liked
        'liked',                -- notification_type is 'sc'
        false,               -- is_read is false by default
        now()                -- created_at is the current timestamp
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_notify_on_like
AFTER INSERT ON public.likes
FOR EACH ROW
EXECUTE FUNCTION notify_on_like();




CREATE OR REPLACE FUNCTION notify_reply_insert()
RETURNS TRIGGER 
SECURITY DEFINER  -- Ensure the function executes with the privileges of the owner
AS $$
BEGIN
    -- Insert a notification when a new reply is inserted
    INSERT INTO public.notification (user_id, related_user_id, related_post_id, notification_type, is_read, created_at)
    VALUES (NEW.user_id, (SELECT user_id FROM public.post WHERE id = NEW.post_id), NEW.post_id, 'replied', false, NOW());
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_reply_insert
AFTER INSERT ON public.reply
FOR EACH ROW
EXECUTE FUNCTION notify_reply_insert();




CREATE OR REPLACE FUNCTION notify_repost_insert()
RETURNS TRIGGER 
SECURITY DEFINER  -- Ensure the function executes with the privileges of the owner
AS $$
BEGIN
    -- Insert a notification when a new repost is inserted
    INSERT INTO public.notification (user_id, related_user_id, related_post_id, notification_type, is_read, created_at)
    VALUES (NEW.user_id, (SELECT user_id FROM public.post WHERE id = NEW.original_post_id), NEW.original_post_id, 'reposted', false, NOW());
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_repost_insert
AFTER INSERT ON public.repost
FOR EACH ROW
EXECUTE FUNCTION notify_repost_insert();