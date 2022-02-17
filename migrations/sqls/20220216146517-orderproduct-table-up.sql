CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL CONSTRAINT positiveqty CHECK (quantity > 0),
    order_id integer NOT NULL REFERENCES orders(id),
    product_id integer NOT NULL REFERENCES product(id)
);