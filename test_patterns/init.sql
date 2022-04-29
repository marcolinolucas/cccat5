CREATE DATABASE test_patterns;

\c test_patterns;

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name varchar(255),
	price float
);

INSERT INTO products (name, price)
VALUES ('Redmi 10', 1340.00);

INSERT INTO products (name, price)
VALUES ('Motorola Moto E20 Cinza 32GB', 759.05);

INSERT INTO products (name, price)
VALUES ('iPhone 13 Pro Max', 8138.90 );
