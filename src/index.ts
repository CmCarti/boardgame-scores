import dotenv, { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../.env') });
import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import User from './data/models/User';
import userRoutes from './routes/User/userRoutes';
import logger from './helpers/logger';
import authRoutes from './routes/Auth/authRoutes';
import auth from './middleware/auth';
import playerRoutes from './routes/Player/playerRoutes';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/player', auth, playerRoutes);
app.use('/user', auth, userRoutes);
app.use('/auth', auth, authRoutes);

/**
 * @todo move this into middleware
 */
app.use(function (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  logger.error(err);
  res.status(500).send('Something went wrong');
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
