import Client from '../database';

export type Product = {
  id: Number;
  name: String;
  price: Number;
  category: String;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM product';

      const result = await conn.query(sql);
      const product: Product[] = result.rows;

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`unable to Load products: ${err}`);
    }
  }

  async create(name: String, price:Number, category: String): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [name, price, category]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`unable to create product (${name}): ${err}`);
    }
  }

  async show(id: string): Promise<Product | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM product WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      const product = result.rows[0];

      conn.release();
      return product;
    } catch (error) {
      throw new Error(`Product with ID ${id} failed: ${error}`);
    }
  }

  async showByCategory(category: String): Promise<Product[] | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM product WHERE category=($1)';

      const result = await conn.query(sql, [category]);
      const product = result.rows;

      conn.release();
      return product;
    } catch (error) {
      throw new Error(`Product with Category ${category} failed: ${error}`);
    }
  }
}
