-- Set up Storage!
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.

-- Avatar Bucker
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects
  for select to public using (bucket_id = 'avatars');

create policy "Authenticated can upload an avatar." on storage.objects
  for insert to authenticated with check (bucket_id = 'avatars');
  
create policy "Anyone can update their own avatar." on storage.objects
  for update using ( auth.uid() = owner ) with check (bucket_id = 'avatars');



-- Public Posts Bucket
insert into storage.buckets (id, name)
  values ('public_posts', 'public_posts');

create policy "Posts images are publicly accessible." on storage.objects
  for select to public using (bucket_id = 'public_posts');

create policy "Authenticated can upload a post image." on storage.objects
  for insert to authenticated with check (bucket_id = 'public_posts');

create policy "Anyone can update their own post." on storage.objects
  for update using ( auth.uid() = owner ) with check (bucket_id = 'public_posts');

create policy "Anyone can delete their own post." on storage.objects 
  for delete using (auth.uid () = owner);



-- Public Project Bucket
insert into storage.buckets (id, name)
  values ('public_projects', 'public_projects');

create policy "Projects images are publicly accessible." on storage.objects
  for select to public using (bucket_id = 'public_projects');

create policy "Authenticated can upload a project image." on storage.objects
  for insert to authenticated with check (bucket_id = 'public_projects');

create policy "Anyone can update their own project." on storage.objects
  for update using ( auth.uid() = owner ) with check (bucket_id = 'public_projects');

create policy "Anyone can delete their own project." on storage.objects 
  for delete using (auth.uid () = owner);
