-- public user details 
CREATE VIEW public_profile_view AS
SELECT
    p.id,
    p.name,
    p.username,
    p.email,
    p.avatar_url,
    p.bio,
    p.about_me,
    p.skills,
    p.streak_points,
    p.status,
    p.created_at,
    c.name AS country_name,
    ur.role AS user_role,
    ul.level AS user_level
FROM
    profile p
LEFT JOIN
    countries c ON p.location = c.id
JOIN 
    user_role ur ON p.id = ur.user_id
JOIN
    user_level ul ON p.id = ul.user_id;



-- private user details
CREATE VIEW private_profile_view AS
SELECT
    p.id,
    p.name,
    p.username,
    p.email,
    p.avatar_url,
    p.bio,
    p.about_me,
    p.skills,
    p.streak_points,
    p.status,
    p.token_hash,
    p.created_at,
    p.updated_at,
    c.name AS country_name,
    ur.role AS user_role,
    ul.level AS user_level
FROM
    profile p
LEFT JOIN
    countries c ON p.location = c.id
JOIN
    user_role ur ON p.id = ur.user_id
JOIN
    user_level ul ON p.id = ul.user_id;


-- public lobby view 
create view
  public.project_technology_request_view as
select
  p.id as project_id,
  p.title as project_title,
  p.created_at as project_created_at,
  p.img_url as project_img_url,
  coalesce(r.request_count, 0::bigint) as request_count,
  jsonb_agg(
    jsonb_build_object('name', t.name, 'designation', t.designation)
  ) as technologies
from
  project p
  join stack s on p.id = s.project_id
  join technology t on s.tech_id = t.id
  left join (
    select
      team.project_id,
      count(*) as request_count
    from
      request req
      join team team on req.team_id = team.id
    group by
      team.project_id
  ) r on p.id = r.project_id
group by
  p.id,
  p.title,
  p.created_at,
  p.img_url,
  r.request_count;