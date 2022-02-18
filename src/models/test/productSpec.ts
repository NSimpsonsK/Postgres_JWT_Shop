import { Product, ProductStore } from '../productModel';

const store = new ProductStore();
const testProduct:Product = {
  name: "Test Product",
  price: 22,
  category: "Test Category"
};

describe("Product Model", () => {
  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a showByCategory method', () => {
    expect(store.showByCategory).toBeDefined();
  });

  it('create method should add a Product', async () => {
    const result = await store.create(testProduct);
    expect(result).toEqual({
      id: 1,
      name: testProduct.name,
      price: testProduct.price,
      category: testProduct.category
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      name: testProduct.name,
      price: testProduct.price,
      category: testProduct.category
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      name: testProduct.name,
      price: testProduct.price,
      category: testProduct.category
    });
  });

  it('showByCategory method should return a list of products', async () => {
    const result = await store.showByCategory(testProduct.category);
    expect(result).toEqual([{
      id: 1,
      name: testProduct.name,
      price: testProduct.price,
      category: testProduct.category
    }]);
  });
});