import { User, UserStore } from '../../src/models/userModel';

const store = new UserStore();
const firstname= "John";
const lastname= "Doe";
const password= "123456789";
let user: User;

export const createUser = async (): Promise<User> => {
  const result = await store.create(firstname,lastname,password);
  expect(result.firstname).toEqual(firstname);
  expect(result.lastname).toEqual(lastname);
  return result;
};

describe("User Model", () => {
  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('create method should add a User', async () => {
    user = await store.create(firstname,lastname,password);
    expect(user.firstname).toEqual(firstname);
    expect(user.lastname).toEqual(lastname);
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    const result0 = result[0];
    expect(result0.firstname).toBeDefined();
    expect(result0.lastname).toBeDefined();
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(user.id);
    expect(result.firstname).toEqual(firstname);
    expect(result.lastname).toEqual(lastname);
  });

  it('authenticate method should return a user', async () => {
    const result = await store.authenticate(user.id,password as string);
    expect(result).toBeDefined();
  });
});