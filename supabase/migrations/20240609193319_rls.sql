ALTER TABLE public.post ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reply ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repost ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmark ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_role ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_level ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technology ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;





create policy "Allow auth admin to read user roles" ON public.user_role
as permissive for select
to supabase_auth_admin
using (true);



-- RLS for Project
-- SELECT
CREATE POLICY "Allow individual select access" ON public.project FOR SELECT USING( true );
-- INSERT
CREATE POLICY "Allow pro user insert to project " ON public.project FOR INSERT WITH CHECK ( authorize('project.insert') );
-- Make a trigger insert owner_id

-- UPDATE
CREATE POLICY "Allow pro user update their own project " ON public.project FOR UPDATE USING ( authorize('project.update') AND ( auth.uid() = owner_id ));
-- DLETEE
-- CREATE POLICY "disallow individual delet access" ON public.project FOR DELETE USING( false );



-- RLS for Team
-- SELECT
CREATE POLICY "Allow all individual select access" ON public.team FOR SELECT USING( true );
-- INSERT
CREATE POLICY "Allow pro to insert teams for their own project" ON public.team FOR INSERT WITH CHECK ( authorize('team.insert') AND ( auth.uid() = (select owner_id from project where id = project_id )));
-- When a user create a project should be inserted by trigger in table team and pass project_id

-- UPDATE
CREATE POLICY "Allow pro to update their own team " ON public.team FOR UPDATE USING ( authorize('team.update') AND ( auth.uid() = (select owner_id from project where id = project_id )));
-- DLETEE
CREATE POLICY "Allow pro to delete thier own team" ON public.team FOR DELETE USING( authorize('team.delete') AND ( auth.uid() = (select owner_id from project where id = project_id )));



-- RLS for Request
-- SELECT
CREATE POLICY "Allow sender and receiver read access" ON public.request FOR SELECT USING( auth.uid() = user_id OR (authorize('request.select') AND  auth.uid()=(  select owner_id from project where id = (select project_id from team))) );
-- INSERT
CREATE POLICY "Allow all to send request " ON public.request FOR INSERT WITH CHECK ( true );
--  make a trigger insert req id in requestStatus table

-- UPDATE
CREATE POLICY "Allow pro to accept requests for their own projects" ON public.team FOR UPDATE USING ( authorize('request.update') AND  auth.uid()=(  select owner_id from project where id = (select project_id from team)) );
revoke
update
  on table public.request
from  authenticated, anon;

grant
update
  (status) on table public.request to authenticated;
-- DLETEE
CREATE POLICY "sender can delete" ON public.request FOR DELETE USING( auth.uid() = user_id );


-- User Role 
create policy "Enable read access for all users" on "public"."user_role" as PERMISSIVE for SELECT to public using ( true );

-- Profile 
create policy "Enable read access for users to read own data" on "public"."profile" as PERMISSIVE for SELECT to public using (  auth.uid() = id );
