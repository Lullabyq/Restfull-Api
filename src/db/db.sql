CREATE TABLE users (
  id INT PRIMARY KEY,
  login VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
)

CREATE TABLE employees (
  id INT PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  position VARCHAR NOT NULL,
  salary INT NOT NULL,
  birthday VARCHAR
)
