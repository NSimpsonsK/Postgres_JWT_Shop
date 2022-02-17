import Client from '../database';

export type Order = {
  id?: Number;
  status: String;
  user_id: Number;
};

export type OrderProduct = {
  id?: Number;
  quantity: Number;
  product_id: Number;
  order_id: Number;
};

export class OrderStore {
  showCurrentOrderByUserId = async (
    userId: number
  ): Promise<OrderProduct[]> => {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT * FROM orders INNER JOIN order_product ON (SELECT id FROM orders WHERE order_status=($1) AND user_id = ($2) ORDER BY id LIMIT 1) = order_product.order_id';

      const result = await conn.query(sql, ['active', userId]);
      const orderProducts: OrderProduct[] = result.rows;

      conn.release();

      return orderProducts;
    } catch (err) {
      throw new Error(
        `unable to Load latest active orders with user_id ${userId}: ${err}`
      );
    }
  };

  createOrder = async (user_Id: Number, status: String): Promise<Order[]> => {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sql, [user_Id, status]);
      const order: Order[] = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`unable to create order with UserID ${user_Id}: ${err}`);
    }
  };

  createOrderProduct = async (
    order_id: Number,
    quantity: Number,
    product_id: Number
  ): Promise<OrderProduct[]> => {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO order_product (order_id, quantity, product_id) VALUES($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [order_id, quantity, product_id]);
      const orderproduct: OrderProduct[] = result.rows[0];

      conn.release();

      return orderproduct;
    } catch (err) {
      throw new Error(
        `unable to orderProduct with orderID ${order_id}: ${err}`
      );
    }
  };
}
