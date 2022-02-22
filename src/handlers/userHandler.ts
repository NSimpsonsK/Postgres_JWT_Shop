import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User, UserStore } from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();
const userStore = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await userStore.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const user = await userStore.show(parseInt(_req.url.substring(_req.url.lastIndexOf('/')+1)));
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (_req: Request, res: Response) => {
  try {
    const newUser = await userStore.create(_req.body.firstname,_req.body.lastname,_req.body.password);
    var token = jwt.sign(
      { user: newUser },
      process.env.JWT_SECRET_STR as string
    );
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    if (!authorizationHeader) {
      res
        .status(401)
        .send('Failed to verify jwt token: missing authorization hearder');
      return;
    }
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_STR as string);

    next();
  } catch (error) {
    res.status(401).send(`${error}`);
  }
};

export const userRoutes = (app: express.Application) => {
  app.get('/user-overview', verifyAuthToken, index);
  app.get('/user/:id', verifyAuthToken, show);
  app.post('/user', create);
};
