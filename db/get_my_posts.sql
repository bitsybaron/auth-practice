SELECT u.name, p.post_id, p.title, p.content
FROM recipe_users u JOIN recipe_posts p  
ON u.user_id = p.author_id
WHERE u.user_id = $1 ORDER BY post_id DESC;