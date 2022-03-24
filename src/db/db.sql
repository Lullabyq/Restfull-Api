CREATE TABLE users (
  id VARCHAR NOT NULL,
  login VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  firstName VARCHAR,
  lastName VARCHAR
)

CREATE TABLE employees (
  id VARCHAR NOT NULL,
  firstName VARCHAR,
  lastName VARCHAR,
  birthday VARCHAR,
  position VARCHAR,
  salary INT
)
