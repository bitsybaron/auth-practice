CREATE TABLE recipe_users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(35),
    email VARCHAR(30),
    password TEXT
);

CREATE TABLE recipe_posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    author_id INT REFERENCES recipe_users(user_id)
);
