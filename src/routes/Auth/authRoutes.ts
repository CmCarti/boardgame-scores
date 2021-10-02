import { Response, Router } from 'express';
import RequestBody from '../../data/models/RequestBody';
import login from './controllers/login';

const authRoutes = Router();

authRoutes.post('/login', login);

export default authRoutes;
