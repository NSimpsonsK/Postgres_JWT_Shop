import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type User = {
  id: Number;
  firstname: String;
  lastname: String;
  password: String;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);
      const user = result.rows;

      //Remove hashed Password from Query result
      user.forEach((element) => {
        element.password_digest = '';
      });

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable to Load users: ${err}`);
    }
  }

  async create(
    firstname: String,
    lastname: String,
    password: String
  ): Promise<User> {
    try {
      if (process.env.PEPPER) {
        const conn = await Client.connect();
        const sql =
          'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *';
        const hash = bcrypt.hashSync(
          (password + process.env.PEPPER) as string,
          parseInt(process.env.SALT_ROUNDS as string)
        );
        const result = await conn.query(sql, [firstname, lastname, hash]);
        const user = result.rows[0];
        user.password_digest = '';

        conn.release();

        return user;
      } else {
        throw new Error('Server Error');
      }
    } catch (err) {
      throw new Error(`unable create user (${firstname} ${lastname}): ${err}`);
    }
  }

  async show(id: Number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      user.password_digest = '';

      conn.release();
      return user;
    } catch (error) {
      throw new Error(`User with ID ${id} failed: ${error}`);
    }
  }

  async authenticate(id: Number, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT password_digest FROM users WHERE id=($1)';

    const result = await conn.query(sql, [id]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (
        bcrypt.compareSync(
          (password + process.env.PEPPER) as string,
          user.password_digest
        )
      ) {
        return user;
      }
    }

    return null;
  }
}
