CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    price integer NOT NULL CONSTRAINT positiveprice CHECK (price > 0),
    category VARCHAR(100) NOT NULL UNIQUE
);