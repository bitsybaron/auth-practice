CREATE TABLE recipe_users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(35),
    email VARCHAR(30),
    password TEXT
);