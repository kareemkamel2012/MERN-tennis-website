CREATE DATABASE tennisdb;

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(255),
    ranking INT,
    country VARCHAR(255)
);