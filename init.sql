DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  message varchar(255),
  created_at timestamp DEFAULT now()::timestamp
);

