import dotenv from 'dotenv';
import supertest from 'supertest';
import app from '../../src/server';
import { createUserAPI } from './userHandlerSpec';
dotenv.config();

const request = supertest(app);

const name = 'Test Product';
const price = 22;
const category = 'Test Category';
let id: string;
let jwtToken:String;



describe('Test product handler', () => {

  beforeAll(async () => {
    jwtToken = await createUserAPI();
  });

  it('create a product with a jwt token', async () => {
    const response = await request
      .post('/product')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: name, price: price, category: category });
    id = response.body.id;
    expect(response.status).toBe(200);
  });

  it('create a product without a jwt token', async () => {
    const response = await request
      .post('/product')
      .send({ name: name, price: price, category: category });
    expect(response.status).toBe(401);
  });

  it('index method', async () => {
    const response = await request.get('/product-overview');
    expect(response.status).toBe(200);
  });

  it('show method', async () => {
    const response = await request.get(`/product/${id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(name);
    expect(response.body.price).toBe(price);
    expect(response.body.category).toBe(category);
  });
});
