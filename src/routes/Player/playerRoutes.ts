import { Router } from 'express';
import createPlayer from './controllers/createPlayer';

const playerRoutes = Router();
playerRoutes.post('/', createPlayer);
export default playerRoutes;
