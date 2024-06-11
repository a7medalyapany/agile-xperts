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