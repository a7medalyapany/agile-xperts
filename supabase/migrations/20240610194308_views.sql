-- public user details 
create view
  public.public_profile_view as
select
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
    c.name as country_name,
    ur.role as user_role
from
    profile p
LEFT JOIN
    countries c on p.location = c.id
JOIN 
    user_role ur on p.id = ur.user_id;


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
    ur.role AS user_role

FROM
    profile p
LEFT JOIN
    countries c ON p.location = c.id
JOIN
    user_role ur ON p.id = ur.user_id;