# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 'product-overview' [GET]
- Show 'product/:id' [GET]
- Create [token required] 'product' [POST]
- Products by category (args: product category) 'product/:category' [GET]

#### Users
- Index [token required] Index 'user-overview' [GET]
- Show [token required] 'user/:id' [GET]
- Create N[token required] 'user' [POST]

#### Orders
- Show Current Order by user 'order/:id' [token required] [GET]
- Create Order 'order' (args: user_id, status) [token required] [POST]
- Create Order_Products 'order-product' (args: order_id, product_id, quantity) [token required] [POST]

## Data Shapes
#### Product
-  id
- name
- price
- category

The Schema can be found at [create-table-product](./migrations/sqls/20220216141510-product-table-up.sql).

#### User
- id
- firstName
- lastName
- password


The Schema can be found at [create-table-User](./migrations/sqls/20220216144644-user-table-up.sql).

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


The Schema can be found at [create-table-Order](./migrations/sqls/20220216145655-order-table-up.sql) and [create-table-OrderProduct](./migrations/sqls/20220216146517-orderproduct-table-up.sql).
