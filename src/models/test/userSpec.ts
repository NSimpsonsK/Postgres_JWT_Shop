import { User, UserStore } from '../userModel';

const store = new UserStore();
const testUser:User = {
  firstname: "John",
  lastname: "Doe",
  password: "123456789"
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
    const result = await store.create(testUser);
    expect(result.firstname).toEqual(testUser.firstname);
    expect(result.lastname).toEqual(testUser.lastname);
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
    const result0 = result[0];
    expect(result0.firstname).toEqual(testUser.firstname);
    expect(result0.lastname).toEqual(testUser.lastname);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("1");
    expect(result.firstname).toEqual(testUser.firstname);
    expect(result.lastname).toEqual(testUser.lastname);
  });

  it('authenticate method should return a user', async () => {
    const result = await store.authenticate("1",testUser.password as string);
    expect(result).toBeDefined();
  });
});