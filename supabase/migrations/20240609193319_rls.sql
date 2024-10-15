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
ALTER TABLE public.social_media ENABLE ROW LEVEL SECURITY;
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
-- UPDATE
CREATE POLICY "Allow pro to update their own team " ON public.team FOR UPDATE USING ( authorize('team.update') AND ( auth.uid() = (select owner_id from project where id = project_id )));
-- DLETEE
CREATE POLICY "Allow pro to delete thier own team" ON public.team FOR DELETE USING( authorize('team.delete') AND ( auth.uid() = (select owner_id from project where id = project_id )));



-- RLS for Request
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
create policy "Enable read access for all users" on public.user_role as PERMISSIVE for SELECT to public using ( true );

-- Profile 
create policy "Enable read access for users to read own data" on public.profile as PERMISSIVE for SELECT to public using (  auth.uid() = id );
CREATE policy "Allow users to update their own profile" on public.profile for update using (auth.uid() = id);


-- Stack
alter policy "Enable read access for all users" on public.stack for SELECT to public using ( true );

-- Member

-- Allow users to select from the member table if they are part of the team
CREATE POLICY select_member_if_team_member
ON public.member
FOR SELECT
USING (
  EXISTS (
    SELECT 1 
    FROM public.member m
    WHERE m.team_id = member.team_id AND m.user_id = auth.uid()
  )
);


-- RLS For Social Media Tables
-- Select all posts
CREATE POLICY "Allow select for all" ON post
FOR SELECT
USING (true);

-- Insert posts for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON post
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Update only own posts
CREATE POLICY "Allow update for own posts" ON post
FOR UPDATE
USING (auth.uid() = user_id);

-- Delete only own posts
CREATE POLICY "Allow delete for own posts" ON post
FOR DELETE
USING (auth.uid() = user_id);


-- Select all likes
CREATE POLICY "Allow select for all" ON likes
FOR SELECT
USING (true);

-- Insert likes for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON likes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Delete only own likes
CREATE POLICY "Allow delete for own likes" ON likes
FOR DELETE
USING (auth.uid() = user_id);


-- Select all bookmarks
CREATE POLICY "Allow select for own " ON bookmark
FOR SELECT
USING (auth.uid() = user_id);

-- Insert bookmarks for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON bookmark
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Delete only own bookmarks
CREATE POLICY "Allow delete for own bookmarks" ON bookmark
FOR DELETE
USING (auth.uid() = user_id);

to public using ( true );

-- Select all replies
CREATE POLICY "Allow select for all" ON reply
FOR SELECT
USING (true);

-- Insert replies for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON reply
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Update only own replies
CREATE POLICY "Allow update for own replies" ON reply
FOR UPDATE
USING (auth.uid() = user_id);

-- Delete only own replies
CREATE POLICY "Allow delete for own replies" ON reply
FOR DELETE
USING (auth.uid() = user_id);



-- Select all reposts
CREATE POLICY "Allow select for all" ON repost
FOR SELECT
USING (true);

-- Insert reposts for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON repost
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Delete only own reposts
CREATE POLICY "Allow delete for own reposts" ON repost
FOR DELETE
USING (auth.uid() = user_id);




-- Select all technologies
alter policy "Enable read access for all users" on public.technologies to public using ( true );


-- Notification
CREATE POLICY "Allow select for owner of notifications" ON notification
FOR SELECT
USING (auth.uid() = related_user_id);

create policy "Enable delete for users based on user_id" on public.notification to public using ( (( SELECT auth.uid() AS uid) = user_id) );



-- Follows
-- Create a policy to allow users to insert a follow only if they are the follower
create policy "allow_user_to_insert_own_follows" on public.follows for insert
with
  check (auth.uid () = followe_id);

-- Create a policy to allow users to delete a follow only if they are the follower
create policy "allow_user_to_delete_own_follows" on public.follows for delete using (auth.uid () = followe_id);

-- Create a policy to allow users to select their own follows
create policy "allow_user_to_select_own_follows" on public.follows for
select
  using (
    auth.uid () = followe_id
  );

create policy "Enable read access for all users" on public.follows to public using ( true );


-- User Activity
create policy "Enable insert for authenticated users only" on public.user_activity to authenticated with check ( true );


-- Countries
create policy "Enable read access for all users" on public.countries as PERMISSIVE for SELECT to public using ( true );



-- Social Media
create policy "Enable delete for users based on user_id" on public.social_media to public using ( (( SELECT auth.uid() AS uid) = user_id) );

create policy "Enable insert for authenticated users only" on public.social_media to authenticated with check ( true );

create policy "Enable read access for all users" on public.social_media as PERMISSIVE for SELECT to public using ( true );

create policy "user update their own rows" on public.social_media to public using ( (user_id = auth.uid()) );
