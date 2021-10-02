import { Router } from 'express';
import getUsers from './controllers/getUsers';
import registerUser from './controllers/registerUser';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.post('/', registerUser);

export default userRoutes;
