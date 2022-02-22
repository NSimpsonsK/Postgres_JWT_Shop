import { Order, OrderProduct, OrderStore } from '../../src/models/orderModel';
import { Product } from '../../src/models/productModel';
import { User } from '../../src/models/userModel';
import { createProduct } from './productModelSpec';
import { createUser } from './userModelSpec';

const store = new OrderStore();
const status = 'active';
const quantity = 12;

let user: User;
let product: Product;
let order: Order;
let orderProduct: OrderProduct;

describe('Order Model', () => {
  beforeAll(async () => {
    user = await createUser();
    product = await createProduct();
    order = await store.createOrder(user.id, status);
    orderProduct = await store.createOrderProduct(
      order.id,
      quantity,
      product.id
    );
  });

  it('showCurrentOrderByUserId should return an Order', async () => {
    const showedProduct = await store.showCurrentOrderByUserId(user.id);
    expect(showedProduct[0].order_id).toEqual(order.id);
    expect(showedProduct[0].product_id).toEqual(orderProduct.product_id);
    expect(showedProduct[0].quantity).toEqual(orderProduct.quantity);
  });
});
