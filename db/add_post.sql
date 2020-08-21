INSERT INTO recipe_posts (title, content, author_id)
VALUES
($1, $2, $3)

RETURNING *;