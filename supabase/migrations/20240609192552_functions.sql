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





CREATE
OR REPLACE FUNCTION delete_user_notification (
  p_notification_type TEXT,
  p_related_post_id BIGINT,
  p_user_id uuid
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    -- Check if the notification exists for the user
    IF NOT EXISTS (
        SELECT 1 
        FROM notification 
        WHERE notification_type = p_notification_type
          AND related_post_id = p_related_post_id
          AND user_id = p_user_id
    ) THEN
        RAISE EXCEPTION 'Notification not found or you do not have permission to delete it.';
    END IF;

    -- Perform the delete operation
    DELETE FROM notification
    WHERE notification_type = p_notification_type
      AND related_post_id = p_related_post_id
      AND user_id = p_user_id;

    RAISE NOTICE 'Notification deleted successfully.';
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




CREATE OR REPLACE FUNCTION get_users_in_same_team(p_user_id uuid)
RETURNS TABLE(user_id uuid, username text, name text, avatar_url text)
SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT p.id, p.username, p.name, p.avatar_url
    FROM profile p
    JOIN member m ON p.id = m.user_id
    LEFT JOIN follows f ON f.following_id = p.id AND f.followe_id = p_user_id
    WHERE m.team_id IN (
        SELECT m2.team_id
        FROM member m2
        WHERE m2.user_id = p_user_id
    )
    AND p.id != p_user_id
    AND f.id IS NULL -- Ensures member_id is not followed by followe_id
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;




-- Function return number of users not following noob users 
CREATE OR REPLACE FUNCTION get_recent_users(num_users integer, p_user_id uuid)
RETURNS TABLE(user_id uuid, username text, name text, avatar_url text, signup_date timestamp with time zone)
SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (p.id)
           p.id, p.username, p.name, p.avatar_url, p.created_at AS signup_date
    FROM profile p
    LEFT JOIN follows f ON p.id = f.following_id AND f.followe_id = p_user_id
    WHERE f.id IS NULL -- Ensures p.id is not followed by p_user_id
    ORDER BY p.id, p.created_at DESC
    LIMIT num_users;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION search_projects(
  query text DEFAULT NULL, 
  tech_filter text[] DEFAULT NULL
)
RETURNS TABLE (
  project_id bigint,
  image_url text,
  title text,
  tech_stack jsonb,
  knock_count bigint,
  created_at timestamp with time zone
) 
LANGUAGE plpgsql
SECURITY DEFINER  -- Add this clause to set the security context
AS $$
BEGIN
  -- Scenario 1: If tech_filter is provided and query is NULL
  IF query IS NULL AND tech_filter IS NOT NULL THEN
    RETURN QUERY 
      SELECT
        p.id as project_id,
        p.img_url::text as image_url,  -- Cast to text
        p.title::text as title,        -- Cast to text
        (
          SELECT jsonb_agg(jsonb_build_object('id', t.id, 'name', t.name, 'designation', t.designation))
          FROM stack s
          JOIN technology t ON s.tech_id = t.id
          WHERE s.project_id = p.id
        ) AS tech_stack,
        COALESCE(r.request_count, 0) AS knock_count,  -- Use aggregated request count
        p.created_at
      FROM project p
      LEFT JOIN (
        SELECT
          team.project_id,
          COUNT(*) AS request_count
        FROM request req
        JOIN team team ON req.team_id = team.id
        GROUP BY team.project_id
      ) r ON p.id = r.project_id
      WHERE p.id IN (
        SELECT s.project_id
        FROM stack s
        JOIN technology t ON s.tech_id = t.id
        WHERE t.name = ANY(tech_filter)
      )
      ORDER BY p.created_at DESC
      LIMIT 5;

  -- Scenario 2: If query is provided, first try searching by project name, then by technology
  ELSIF query IS NOT NULL THEN
    -- First, try searching for projects by name
    RETURN QUERY 
      SELECT
        p.id as project_id,
        p.img_url::text as image_url,  -- Cast to text
        p.title::text as title,        -- Cast to text
        (
          SELECT jsonb_agg(jsonb_build_object('id', t.id, 'name', t.name, 'designation', t.designation))
          FROM stack s
          JOIN technology t ON s.tech_id = t.id
          WHERE s.project_id = p.id
        ) AS tech_stack,
        COALESCE(r.request_count, 0) AS knock_count,  -- Use aggregated request count
        p.created_at
      FROM project p
      LEFT JOIN (
        SELECT
          team.project_id,
          COUNT(*) AS request_count
        FROM request req
        JOIN team team ON req.team_id = team.id
        GROUP BY team.project_id
      ) r ON p.id = r.project_id
      WHERE p.title ILIKE '%' || query || '%'
      ORDER BY p.created_at DESC;

    -- If no projects by name, search by technology name
    RETURN QUERY 
      SELECT
        p.id as project_id,
        p.img_url::text as image_url,  -- Cast to text
        p.title::text as title,        -- Cast to text
        (
          SELECT jsonb_agg(jsonb_build_object('id', t.id, 'name', t.name, 'designation', t.designation))
          FROM stack s
          JOIN technology t ON s.tech_id = t.id
          WHERE s.project_id = p.id
        ) AS tech_stack,
        COALESCE(r.request_count, 0) AS knock_count,  -- Use aggregated request count
        p.created_at
      FROM project p
      LEFT JOIN (
        SELECT
          team.project_id,
          COUNT(*) AS request_count
        FROM request req
        JOIN team team ON req.team_id = team.id
        GROUP BY team.project_id
      ) r ON p.id = r.project_id
      WHERE p.id IN (
        SELECT s.project_id
        FROM stack s
        JOIN technology t ON s.tech_id = t.id
        WHERE t.name ILIKE '%' || query || '%'
      )
      ORDER BY p.created_at DESC;

  -- Scenario 3: If no query or tech_filter, return latest projects ordered by knock_count
  ELSE
    RETURN QUERY 
      SELECT
        p.id as project_id,
        p.img_url::text as image_url,  -- Cast to text
        p.title::text as title,        -- Cast to text
        (
          SELECT jsonb_agg(jsonb_build_object('id', t.id, 'name', t.name, 'designation', t.designation))
          FROM stack s
          JOIN technology t ON s.tech_id = t.id
          WHERE s.project_id = p.id
        ) AS tech_stack,
        COALESCE(r.request_count, 0) AS knock_count,  -- Use aggregated request count
        p.created_at
      FROM project p
      LEFT JOIN (
        SELECT
          team.project_id,
          COUNT(*) AS request_count
        FROM request req
        JOIN team team ON req.team_id = team.id
        GROUP BY team.project_id
      ) r ON p.id = r.project_id
      ORDER BY knock_count DESC, p.created_at DESC
      LIMIT 5;
  END IF;
END;
$$;



-- Algorithm for point system
CREATE OR REPLACE FUNCTION calculate_user_points(input_user_id UUID) RETURNS VOID AS $$
DECLARE
    total_user_points BIGINT := 0; 
    received_likes_count BIGINT; 
    current_user_level SMALLINT; 
    pro_level_threshold SMALLINT := 5; 
BEGIN
    -- Get the number of likes received by the user's posts (over the last 30 days)
    SELECT COUNT(*) INTO received_likes_count
    FROM public.likes l
    JOIN public.post p ON l.post_id = p.id
    WHERE p.user_id = input_user_id AND l.created_at >= NOW() - INTERVAL '30 days';

    -- Points from likes received (1 point for every 10 likes received)
    total_user_points := received_likes_count / 10;

    -- Add points based on user activity (e.g., posts created in the last 30 days)
    total_user_points := total_user_points + (SELECT COUNT(*) 
                                                FROM public.user_activity ua 
                                                WHERE ua.user_id = input_user_id AND ua.created_at >= NOW() - INTERVAL '30 days');

    -- Get the current user level
    SELECT level INTO current_user_level 
    FROM public.user_level 
    WHERE user_id = input_user_id;

    -- Scale points based on user level
    CASE current_user_level
        WHEN 1 THEN total_user_points := total_user_points * 1.0;
        WHEN 2 THEN total_user_points := total_user_points * 0.9;
        WHEN 3 THEN total_user_points := total_user_points * 0.8;
        WHEN 4 THEN total_user_points := total_user_points * 0.7;
        WHEN 5 THEN total_user_points := total_user_points * 0.6;
        ELSE total_user_points := total_user_points * 0.5; -- Levels beyond 5
    END CASE;

    -- Update user's total points in the profile table
    UPDATE public.profile
    SET streak_points = streak_points + total_user_points
    WHERE id = input_user_id;

    -- Check if user qualifies for level up
    IF (SELECT streak_points FROM public.profile WHERE id = input_user_id) >= 100 * current_user_level THEN
        -- Increment level
        UPDATE public.user_level
        SET level = level + 1
        WHERE user_id = input_user_id;

        -- Reset points for the new level
        UPDATE public.profile
        SET streak_points = 0
        WHERE id = input_user_id;
    END IF;

    -- Check if user qualifies for Pro status
    IF NOT EXISTS (SELECT 1 FROM public.user_role ur WHERE ur.user_id = input_user_id AND ur.role = 'pro') THEN
        IF current_user_level >= pro_level_threshold THEN
            -- Call the function to promote the user to Pro status
            PERFORM promote_to_pro(input_user_id);
            -- Log the promotion
            -- INSERT INTO public.notification (user_id, message, created_at)
            -- VALUES (input_user_id, 'Congratulations! You’ve been promoted to Pro.', NOW());
        END IF;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error in calculate_user_points: %', SQLERRM; 
        RAISE; 
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;



CREATE OR REPLACE FUNCTION promote_to_pro(input_user_id UUID) RETURNS VOID AS $$
BEGIN
    -- Update the user's role to 'pro' in the user_role table
    UPDATE public.user_role
    SET role = 'pro', assigned_at = NOW()
    WHERE user_id = input_user_id;


EXCEPTION
    WHEN OTHERS THEN
        -- Raise any other exceptions for troubleshooting
        RAISE NOTICE 'Error in promote_to_pro: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;


-- Trigger function to log user activities
CREATE OR REPLACE FUNCTION track_user_activity()
RETURNS TRIGGER AS $$
BEGIN
    -- Log activity
    INSERT INTO public.user_activity (user_id, activity_type)
    VALUES (NEW.user_id, TG_TABLE_NAME);

    -- Calculate user points after logging activity
    PERFORM calculate_user_points(NEW.user_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for when a like is inserted
CREATE TRIGGER after_like_insert
AFTER INSERT ON public.likes
FOR EACH ROW
EXECUTE FUNCTION track_user_activity();

-- Trigger for when a post is created
CREATE TRIGGER after_post_insert
AFTER INSERT ON public.post
FOR EACH ROW
EXECUTE FUNCTION track_user_activity();


CREATE TRIGGER after_user_repost
AFTER INSERT ON public.repost
FOR EACH ROW
EXECUTE FUNCTION track_user_activity();


CREATE TRIGGER after_user_reply
AFTER INSERT ON public.reply
FOR EACH ROW
EXECUTE FUNCTION track_user_activity();



CREATE OR REPLACE FUNCTION update_profile_and_social_media(
  p_user_id UUID,
  p_about_me TEXT,
  p_skills VARCHAR[],
  p_social_media JSON  -- Changed from JSON[]
) RETURNS VOID AS $$
DECLARE
  social_media_item JSON;
BEGIN
  -- Update profile
  UPDATE public.profile
  SET 
    about_me = COALESCE(p_about_me, about_me),
    skills = COALESCE(p_skills, skills),
    updated_at = NOW()
  WHERE id = p_user_id;

  -- Delete existing social media entries only if new entries are provided
  IF p_social_media IS NOT NULL THEN
    DELETE FROM public.social_media WHERE user_id = p_user_id;
  END IF;

  -- Insert new social media entries
  FOR social_media_item IN SELECT * FROM json_array_elements(p_social_media)
  LOOP
    INSERT INTO public.social_media (user_id, platform, account_link)
    VALUES (
      p_user_id,
      (social_media_item->>'platform')::public.social_media_platform,
      social_media_item->>'account_link'
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
