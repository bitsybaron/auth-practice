INSERT INTO recipe_users (name, email, password)
VALUES
($1, $2, $3);

SELECT * FROM recipe_users
WHERE email = $2;