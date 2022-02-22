import dotenv from 'dotenv';
import supertest from 'supertest';
import { Order, OrderProduct } from '../../src/models/orderModel';
import { Product } from '../../src/models/productModel';
import { User } from '../../src/models/userModel';

import app from '../../src/server';
import { createProduct } from '../model/productModelSpec';
import { createUser } from '../model/userModelSpec';
dotenv.config();

const request = supertest(app);

const status = 'active';
const quantity = 10;
let user: User;
let order_id: String;
let product: Product;

describe('Test order handler', () => {
  beforeAll(async () => {
    user = await createUser();
    product = await createProduct();
  });

  it('create a order with a jwt token', async () => {
    const response = await request
      .post('/order')
      .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
      .send({ user_id: user.id, status: status });
    expect(response.status).toBe(200);
    order_id = response.body.id;
  });

  it('create a orderProduct with a jwt token', async () => {
    const response = await request
      .post('/order-product')
      .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
      .send({ order_id: order_id, quantity: quantity, product_id: product.id });
    expect(response.status).toBe(200);
  });

  it('show current order with jwt token', async () => {
    const response = await request
      .get(`/order/${user.id}`)
      .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`);
    expect(response.status).toBe(200);
  });
});
