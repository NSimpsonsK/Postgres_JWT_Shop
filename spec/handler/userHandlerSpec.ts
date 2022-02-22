import supertest from 'supertest';
import app from '../../src/server';

const request = supertest(app);
const firstname = "Test";
const lastname = "User";
const password = "password";

let jwtToken: String;

//TS-Node fehlt noch und Order und Product Handler

describe('Test user handler', () => {
    it('create new user', async () => {
        const response = await (request.post('/user').send({firstname: firstname, lastname: lastname, password: password}));
        jwtToken = response.body;
        expect(response.status).toBe(200);
    });

    it('create user with incomplete info', async () => {
        const response = await (request.post('/user').send({firstname: firstname, password: password}));
        expect(response.status).toBe(401);
    });

    it('index user with a jwt token', async () => {
        const response = await (request.get('/user').set('Authorization', `Bearer ${jwtToken}`));
        expect(response.status).toBe(200);
        const user0 = response.body[0];
        expect(user0.firstname).toBe(firstname);
        expect(user0.lastname).toBe(lastname);
    });

});