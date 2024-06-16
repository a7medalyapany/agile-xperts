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



CREATE VIEW public.post_details AS
SELECT
  post.id AS post_id,
  post.content,
  post.img_url,
  post.created_at,
  post.updated_at,
  profile.id AS author_id,
  profile.name AS author_name,
  profile.username AS author_username,
  profile.avatar_url AS author_avatar_url,
  COALESCE(like_counts.like_count, 0::bigint) AS like_count,
  COALESCE(reply_counts.reply_count, 0::bigint) AS reply_count,
  COALESCE(repost_counts.repost_count, 0::bigint) AS repost_count,
  reply_avatars.avatars AS reply_avatars,
  CASE WHEN auth.uid() IN (SELECT user_id FROM likes WHERE likes.post_id = post.id) THEN TRUE ELSE FALSE END AS has_liked,
  CASE WHEN auth.uid() IN (SELECT user_id FROM repost WHERE repost.original_post_id = post.id) THEN TRUE ELSE FALSE END AS has_reposted,
  CASE WHEN auth.uid() IN (SELECT user_id FROM bookmark WHERE bookmark.post_id = post.id) THEN TRUE ELSE FALSE END AS has_bookmarked
FROM
  post
  JOIN profile ON post.user_id = profile.id
  LEFT JOIN (
    SELECT
      likes.post_id,
      COUNT(*) AS like_count
    FROM
      likes
    GROUP BY
      likes.post_id
  ) like_counts ON post.id = like_counts.post_id
  LEFT JOIN (
    SELECT
      reply.post_id,
      COUNT(*) AS reply_count
    FROM
      reply
    GROUP BY
      reply.post_id
  ) reply_counts ON post.id = reply_counts.post_id
  LEFT JOIN (
    SELECT
      repost.original_post_id AS post_id,
      COUNT(*) AS repost_count
    FROM
      repost
    GROUP BY
      repost.original_post_id
  ) repost_counts ON post.id = repost_counts.post_id
  LEFT JOIN (
    SELECT
      r.post_id,
      ARRAY (
        SELECT
          p.avatar_url
        FROM
          reply r2
          JOIN profile p ON r2.user_id = p.id
        WHERE
          r2.post_id = r.post_id
        ORDER BY
          r2.created_at
        LIMIT
          3
      ) AS avatars
    FROM
      reply r
    GROUP BY
      r.post_id
  ) reply_avatars ON post.id = reply_avatars.post_id;





CREATE VIEW public.post_details_with_replies AS
SELECT 
    post.id AS post_id,
    post.content,
    post.img_url,
    post.created_at,
    post.updated_at,
    profile.id AS author_id,
    profile.name AS author_name,
    profile.username AS author_username,
    profile.avatar_url AS author_avatar_url,
    -- Counting likes
    COALESCE(like_counts.like_count, 0) AS like_count,
    -- Counting replies
    COALESCE(reply_counts.reply_count, 0) AS reply_count,
    -- Counting reposts
    COALESCE(repost_counts.repost_count, 0) AS repost_count,
    -- Reply authors' avatars
    reply_avatars.avatars AS reply_avatars,
    -- Replies details
    reply_details.reply_data AS replies,
    -- Check if the current user has liked the post
    CASE WHEN auth.uid() IN (SELECT user_id FROM likes WHERE likes.post_id = post.id) THEN TRUE ELSE FALSE END AS has_liked,
    -- Check if the current user has reposted the post
    CASE WHEN auth.uid() IN (SELECT user_id FROM repost WHERE repost.original_post_id = post.id) THEN TRUE ELSE FALSE END AS has_reposted,
    -- Check if the current user has bookmarked the post
    CASE WHEN auth.uid() IN (SELECT user_id FROM bookmark WHERE bookmark.post_id = post.id) THEN TRUE ELSE FALSE END AS has_bookmarked
FROM 
    post
JOIN 
    profile ON post.user_id = profile.id
-- Aggregating like counts
LEFT JOIN (
    SELECT 
        post_id,
        COUNT(*) AS like_count
    FROM 
        likes
    GROUP BY 
        post_id
) AS like_counts ON post.id = like_counts.post_id
-- Aggregating reply counts
LEFT JOIN (
    SELECT 
        post_id,
        COUNT(*) AS reply_count
    FROM 
        reply
    GROUP BY 
        post_id
) AS reply_counts ON post.id = reply_counts.post_id
-- Aggregating repost counts
LEFT JOIN (
    SELECT 
        original_post_id AS post_id,
        COUNT(*) AS repost_count
    FROM 
        repost
    GROUP BY 
        original_post_id
) AS repost_counts ON post.id = repost_counts.post_id
-- Aggregating reply avatars
LEFT JOIN (
    SELECT 
        r.post_id,
        ARRAY(
            SELECT p.avatar_url 
            FROM reply r2 
            JOIN profile p ON r2.user_id = p.id 
            WHERE r2.post_id = r.post_id 
            ORDER BY r2.created_at 
            LIMIT 3
        ) AS avatars
    FROM 
        reply r
    GROUP BY 
        r.post_id
) AS reply_avatars ON post.id = reply_avatars.post_id
-- Collecting replies details
LEFT JOIN (
    SELECT 
        post_id,
        json_agg(json_build_object(
            'reply_id', r.id,
            'content', r.content,
            'img_url', r.img_url,
            'created_at', r.created_at,
            'updated_at', r.updated_at,
            'author_id', p.id,
            'author_name', p.name,
            'author_username', p.username,
            'author_avatar_url', p.avatar_url
        )) AS reply_data
    FROM 
        reply r
    JOIN 
        profile p ON r.user_id = p.id
    GROUP BY 
        r.post_id
) AS reply_details ON post.id = reply_details.post_id;


