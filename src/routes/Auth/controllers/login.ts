import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import RequestBody from '../../../data/models/RequestBody';
import User, { UserCreationModel } from '../../../data/models/User';
import userRepository from '../../../data/repositories/userRepository';
import httpResponse from '../../../helpers/httpResponse';
import logger from '../../../helpers/logger';
import bcrypt from 'bcryptjs';
import jwtHelpers from '../../../helpers/jwtHelpers';
import getUserByEmail from '../../User/actions/getUserByEmail';
import LoginRequestBody from '../../../data/models/LoginRequestbody';
import validateLoginRequest from '../actions/validateLoginRequest';

const userNotFound = 'Email or password is incorrect'

async function login(req: RequestBody<LoginRequestBody>, res: Response) {
  const { body } = req;
  const validationError = validateLoginRequest(body);
  if (validationError) return res.status(httpResponse.badRequest).send(validationError);

  const user = getUserByEmail(body.email);
  if(user === null) return res.status(httpResponse.notFound).send(userNotFound);

  if (user && user.length && (await bcrypt.compare(body.password, user[0].password))) {
    const token = jwtHelpers.generateToken(user[0]);
    return res.status(httpResponse.ok).json({ token: token });
  }

  return res.status(httpResponse.badRequest).send('Invalid credentials');
}

export default login;
