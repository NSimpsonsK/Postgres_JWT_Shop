import supertest from 'supertest';
import app from '../../src/server';

const request = supertest(app);
const firstname = 'Test';
const lastname = 'User';
const password = 'password';

let jwtToken: String;

//TS-Node fehlt noch und Order und Product Handler

export const createUserAPI = async (): Promise<String> => {
  const response = await request
    .post('/user')
    .send({ firstname: firstname, lastname: lastname, password: password });
  jwtToken = response.body;
  expect(response.status).toBe(200);
  return jwtToken;
};

describe('Test user handler', () => {
  it('create new user', async () => {
    createUserAPI();
  });

  it('create user with incomplete info', async () => {
    const response = await request
      .post('/user')
      .send({ firstname: firstname, password: password });
    expect(response.status).toBe(401);
  });

  it('index user with a jwt token', async () => {
    const response = await request
      .get('/user-overview')
      .set('Authorization', 'Bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });

  it('index user without a jwt token', async () => {
    const response = await request.get('/user-overview');
    expect(response.status).toBe(401);
  });

  it('show user with a jwt token', async () => {
    const response = await request
      .get('/user/1')
      .set('Authorization', 'Bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });
});
