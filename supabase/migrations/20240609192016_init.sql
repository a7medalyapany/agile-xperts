-- Custom types
create type public.app_role as enum ('pro', 'normal');
create type public.user_status as enum ('ONLINE', 'OFFLINE');
create type public.request_status as enum ('pending', 'rejected', 'accepted');
create type public.social_media_platform as enum ('Facebook', 'X', 'Instagram', 'LinkedIn', 'Google', 'GitHub', 'Other');
create type public.app_permission as enum ('project.insert', 'project.update', 'team.insert','team.update', 'team.delete', 'request.select', 'request.update');
create type public.continents as enum (
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'Oceania',
    'North America',
    'South America'
);


create table public.countries (
  id bigint generated by default as identity primary key,
  name text,
  iso2 text not null,
  iso3 text,
  local_name text,
  continent continents
);

  
comment on table countries is 'Full list of countries.';
comment on column countries.name is 'Full country name.';
comment on column countries.iso2 is 'ISO 3166-1 alpha-2 code.';
comment on column countries.iso3 is 'ISO 3166-1 alpha-3 code.';
comment on column countries.local_name is 'Local variation of the name.';


create table  
  public.profile (
    id uuid not null,
    name text not null,
    username text not null,
    email character varying not null,
    avatar_url text null,
    bio text null,
    about_me text null,
    location bigint null,
    skills character varying[] null,
    streak_points bigint not null default '0'::bigint,
    status public.user_status not null default 'OFFLINE'::user_status,
    token_hash text null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint profile_pkey primary key (id),
    constraint profile_username_key unique (username),
    constraint profile_id_fkey foreign key (id) references auth.users (id) on delete cascade,
    constraint profile_location_fkey foreign key (location) references countries (id) on delete cascade
  ) tablespace pg_default;


create table
  public.user_activity (
    id bigint generated by default as identity,
    user_id uuid not null,
    activity_type character varying not null,
    created_at timestamp with time zone not null default now(),
    constraint user_activity_pkey primary key (id),
    constraint user_activity_user_id_fkey foreign key (user_id) references profile (id) on delete cascade
  ) tablespace pg_default;


create table
  public.user_role (
    id bigint generated by default as identity,
    user_id uuid not null,
    role public.app_role not null default 'normal'::app_role,
    constraint user_role_pkey primary key (id),
    constraint user_role_user_id_key unique (user_id),
    constraint user_role_user_id_fkey foreign key (user_id) references profile (id) on delete cascade
  ) tablespace pg_default;


create table
  public.user_level (
    id bigint generated by default as identity,
    user_id uuid not null,
    level smallint not null default '1'::smallint,
    constraint user_level_pkey primary key (id),
    constraint user_level_user_id_key unique (user_id),
    constraint user_level_user_id_fkey foreign key (user_id) references profile (id) on delete cascade
  ) tablespace pg_default;


create table
  public.role_permissions (
    id bigint generated by default as identity,
    role public.app_role not null,
    permission public.app_permission not null,
    constraint role_permissions_pkey primary key (id),
    constraint role_permissions_role_permission_key unique (role, permission)
  ) tablespace pg_default;


create table
  public.post (
    id bigint generated by default as identity,
    user_id uuid not null,
    content text null,
    img_url text null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null default now(),
    constraint post_pkey primary key (id),
    constraint post_user_id_fkey foreign key (user_id) references profile (id) on delete cascade,
    constraint content_or_img_url check (
      (
        (content is not null)
        or (img_url is not null)
      )
    )
  ) tablespace pg_default;


create table
  public.likes (
    id bigint generated by default as identity,
    user_id uuid not null,
    post_id bigint not null,
    created_at timestamp with time zone not null default now(),
    constraint like_pkey primary key (id),
    constraint like_post_id_fkey foreign key (post_id) references post (id) on delete cascade,
    constraint like_user_id_fkey foreign key (user_id) references profile (id) on delete cascade
  ) tablespace pg_default;


create table
  public.reply (
    id bigint generated by default as identity,
    user_id uuid not null,
    post_id bigint not null,
    content text null,
    img_url text null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint reply_pkey primary key (id),
    constraint reply_post_id_fkey foreign key (post_id) references post (id) on delete cascade,
    constraint reply_user_id_fkey foreign key (user_id) references profile (id) on delete cascade,
    constraint content_or_img_url check (
      (
        (content is not null)
        or (img_url is not null)
      )
    )
  ) tablespace pg_default;


create table
  public.repost (
    id bigint generated by default as identity,
    user_id uuid not null,
    original_post_id bigint not null,
    is_quoted boolean not null default false,
    quote_content text null,
    quote_img_url text null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint repost_pkey primary key (id),
    constraint repost_original_post_id_fkey foreign key (original_post_id) references post (id) on delete cascade,
    constraint repost_user_id_fkey foreign key (user_id) references profile (id) on delete cascade,
    constraint content_or_img_url check (
      (
        (quote_content is not null)
        or (quote_img_url is not null)
      )
    )
  ) tablespace pg_default;


create table
  public.bookmark (
    id bigint generated by default as identity,
    user_id uuid not null,
    post_id bigint not null,
    created_at timestamp with time zone not null default now(),
    constraint bookmark_pkey primary key (id),
    constraint bookmark_post_id_fkey foreign key (post_id) references post (id) on delete cascade,
    constraint bookmark_user_id_fkey foreign key (user_id) references profile (id) on delete cascade
  ) tablespace pg_default;


create table
  public.follows (
    id bigint generated by default as identity,
    followe_id uuid not null,
    following_id uuid not null,
    created_at timestamp with time zone not null default now(),
    constraint follows_pkey primary key (id),
    constraint follows_followe_id_fkey foreign key (followe_id) references profile (id) on update cascade on delete cascade,
    constraint follows_following_id_fkey foreign key (following_id) references profile (id) on update cascade on delete cascade
  ) tablespace pg_default;


create table
  public.notification (
    id bigint generated by default as identity,
    user_id uuid not null,
    related_user_id uuid not null,
    related_post_id bigint not null,
    notification_type character varying not null,
    is_read boolean not null default false,
    created_at timestamp with time zone not null default now(),
    constraint notification_pkey primary key (id),
    constraint notification_related_post_id_fkey foreign key (related_post_id) references post (id) on delete cascade,
    constraint notification_related_user_id_fkey foreign key (related_user_id) references profile (id) on delete cascade,
    constraint notification_user_id_fkey foreign key (user_id) references profile (id) on delete cascade
  ) tablespace pg_default;


create table
  public.project (
    id bigint generated by default as identity,
    owner_id uuid not null,
    title character varying not null,
    description character varying null,
    is_private boolean not null default false,
    repo_name character varying not null,
    img_url text null,
    github_repo_url text not null,
    created_at timestamp with time zone not null default now(),
    update_at timestamp with time zone not null default now(),
    constraint project_pkey primary key (id),
    constraint project_owner_id_fkey foreign key (owner_id) references profile (id) on delete cascade
  ) tablespace pg_default;


create table
  public.technologies (
    name text not null,
    constraint technologies_pkey primary key (name)
  ) tablespace pg_default;


create table
  public.technology (
    id bigint generated by default as identity,
    name text not null,
    designation character varying not null,
    constraint technology_pkey primary key (id),
    constraint technology_name_fkey foreign key (name) references technologies (name) on update cascade on delete cascade
  ) tablespace pg_default;


create table
  public.stack (
    project_id bigint not null,
    tech_id bigint not null,
    constraint stack_pkey primary key (project_id, tech_id),
    constraint stack_project_id_fkey foreign key (project_id) references project (id) on delete cascade,
    constraint stack_tech_id_fkey foreign key (tech_id) references technology (id) on update cascade on delete cascade
  ) tablespace pg_default;


create table
  public.team (
    id bigint generated by default as identity,
    project_id bigint not null,
    name character varying not null,
    description text null,
    created_at timestamp with time zone not null default now(),
    constraint team_pkey primary key (id),
    constraint team_project_id_fkey foreign key (project_id) references project (id) on update cascade on delete cascade
  ) tablespace pg_default;


create table
  public.member (
    user_id uuid not null,
    team_id bigint not null,
    tech_id bigint not null,
    joined_at timestamp with time zone not null default now(),
    constraint member_pkey primary key (user_id, team_id, tech_id),
    constraint member_team_id_fkey foreign key (team_id) references team (id) on update cascade on delete cascade,
    constraint member_tech_id_fkey foreign key (tech_id) references technology (id) on update cascade on delete cascade,
    constraint member_user_id_fkey foreign key (user_id) references profile (id) on delete cascade
  ) tablespace pg_default;


create table
  public.request (
    user_id uuid not null,
    team_id bigint not null,
    tech_id bigint not null,
    status public.request_status not null default 'pending'::request_status,
    requested_at timestamp with time zone not null default now(),
    constraint request_pkey primary key (user_id, team_id, tech_id),
    constraint request_team_id_fkey foreign key (team_id) references team (id) on update cascade on delete cascade,
    constraint request_tech_id_fkey foreign key (tech_id) references technology (id) on update cascade on delete cascade,
    constraint request_user_id_fkey foreign key (user_id) references profile (id) on delete cascade
  ) tablespace pg_default;



CREATE TABLE public.social_media (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    user_id UUID NOT NULL,
    platform PUBLIC.social_media_platform NOT NULL,
    account_link TEXT NOT NULL,
    CONSTRAINT social_media_pkey PRIMARY KEY (id),
    CONSTRAINT social_media_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profile (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Add unique constraint for one account per platform per user, except for 'Other'
CREATE UNIQUE INDEX unique_user_platform
ON public.social_media (user_id, platform)
WHERE platform != 'Other';