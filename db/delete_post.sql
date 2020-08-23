DELETE FROM recipe_posts
WHERE post_id = $1;

SELECT * FROM recipe_posts
ORDER BY post_id DESC;