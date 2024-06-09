CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS trigger
  LANGUAGE plpgsql security definer
  SET search_path = ''
AS $$
DECLARE
  provider text;
  name text;
  user_name text;
  user_email text;
  user_avatar_url text;
BEGIN
  -- Determine the provider
  provider := new.raw_app_meta_data->>'provider';
  
  -- Log the provider for debugging
  RAISE INFO 'Provider: %', provider;

  -- Set values based on the provider
  IF provider = 'github' THEN
    name := new.raw_user_meta_data->>'name';
    user_name := new.raw_user_meta_data->>'user_name';
    user_email := new.raw_user_meta_data->>'email';
    user_avatar_url := new.raw_user_meta_data->>'avatar_url';
  ELSIF provider = 'email' THEN
    name := new.raw_user_meta_data->>'name';
    user_name := new.raw_user_meta_data->>'user_name';
    user_email := new.raw_user_meta_data->>'email';
    user_avatar_url := new.raw_user_meta_data->>'avatar_url';
  ELSE
    -- Handle other providers or default case if needed
    name := 'Unknown';
    user_name := 'Unknown';
    user_email := 'unknown@provider.com';
    user_avatar_url := null;
  END IF;

  -- Log the values for debugging
  RAISE INFO 'Name: %, Username: %, Email: %, Avatar URL: %', name, user_name, user_email, user_avatar_url;

  INSERT INTO public.profile (
    id, name, username, email, avatar_url
  ) VALUES (
    new.id,
    name,
    user_name,
    user_email,
    user_avatar_url
  );

  INSERT INTO public.user_role(user_id)
  VALUES (NEW.id);

  RETURN new;
EXCEPTION
  WHEN others THEN
    RAISE EXCEPTION 'Error occurred: %', SQLERRM;
END;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();



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
