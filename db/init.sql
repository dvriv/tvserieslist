-- Need to execute psql -f db/init.sql
-- Need also a user and db with the same name already created.

DROP DATABASE IF EXISTS tvserieslist_dev;
CREATE DATABASE tvserieslist_dev;

\c tvserieslist_dev; 

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  email VARCHAR,
  hash VARCHAR
  );

INSERT INTO users (username, email, hash)
  VALUES ('TEST', 'test@test.com', 'thisshouldbeahash');
