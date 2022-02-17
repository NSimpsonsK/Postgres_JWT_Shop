import express, { Request, Response } from 'express';
import { Order, OrderProduct, OrderStore } from '../models/orderModel';
import { verifyAuthToken } from './userHandler';
import dotenv from 'dotenv';

dotenv.config();
const orderStore = new OrderStore();

const show = async (_req: Request, res: Response) => {
  try {
    const orderProducts = await orderStore.showCurrentOrderByUserId(
      parseInt(_req.url.substring(_req.url.lastIndexOf('/')+1))
    );
    res.json(orderProducts);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (_req: Request, res: Response) => {
  try {
    const Order: Order = {
      status: _req.body.status,
      user_id: _req.body.user_id
    };

    const newProduct = await orderStore.createOrder(
      Order.user_id,
      Order.status
    );
    res.json(newProduct);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const createOrderElements = async (_req: Request, res: Response) => {
  try {
    const product: OrderProduct = {
      quantity: _req.body.quantity,
      product_id: _req.body.product_id,
      order_id: _req.body.order_id
    };
    const newProduct = await orderStore.createOrderProduct(
      product.order_id,
      product.quantity,
      product.product_id
    );
    res.json(newProduct);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

export const orderRoutes = (app: express.Application) => {
  app.get('/order/:id', verifyAuthToken, show);
  app.post('/order', verifyAuthToken, create);
  app.post('/order-product', verifyAuthToken, createOrderElements);
};
