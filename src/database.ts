import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();


let client: Pool;


if (process.env.ENV == 'test') {
  client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_TEST_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  });
  console.log("Connected with Test Database");
} else {
  //ENV === 'dev'
  client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  });
  console.log("Connected with Dev Database");
}

export default client;
