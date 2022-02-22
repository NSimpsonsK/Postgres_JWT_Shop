import { Product, ProductStore } from '../../src/models/productModel';

const store = new ProductStore();
const name = 'Test Product';
const price = 22;
const category = 'Test Category';
let product: Product;

export const createProduct = async (): Promise<Product> => {
  const product = await store.create(name, price, category);
  expect(product.name).toEqual(name);
  expect(product.price).toEqual(price);
  expect(product.category).toEqual(category);
  return product;
};

describe('Product Model', () => {
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
    product = await createProduct();
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toBeDefined;
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(product.id as unknown as string);
    expect(result).toEqual({
      id: product.id,
      name: name,
      price: price,
      category: category
    });
  });

  it('showByCategory method should return a list of products', async () => {
    const result = await store.showByCategory(category);
    expect(result).toBeDefined;
  });
});
