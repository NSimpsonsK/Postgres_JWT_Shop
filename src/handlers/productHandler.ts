import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/productModel';
import { verifyAuthToken } from './userHandler';
import dotenv from 'dotenv';

dotenv.config();
const productStore = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await productStore.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const product = await productStore.show(_req.url.substring(_req.url.lastIndexOf('/')+1));
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showByCategory = async (_req: Request, res: Response) => {
  try {
    const products = await productStore.showByCategory(_req.url.substring(_req.url.lastIndexOf('/')+1));
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (_req: Request, res: Response) => {
  try {    
    const newProduct = await productStore.create(_req.body.name,_req.body.price,_req.body.category);
    res.json(newProduct);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

export const productRoutes = (app: express.Application) => {
  app.get('/product-overview', index);
  app.get('/product/:id', show);
  app.get('/product/category/:category', showByCategory);
  app.post('/product', verifyAuthToken, create);
};
