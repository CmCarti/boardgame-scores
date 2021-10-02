import { Response } from 'express';
import RequestBody from '../../../data/models/RequestBody';
import User from '../../../data/models/User';
import httpResponse from '../../../helpers/httpResponse';
import jwtHelpers from '../../../helpers/jwtHelpers';
import createNewUser from '../actions/createNewUser';
import validateRegisterUserRequest from '../actions/validateRegisterUserRequest';

async function registerUser(req: RequestBody<User>, res: Response) {
  const { body } = req;
  const validationError = await validateRegisterUserRequest(body);
  if (validationError) {
    return res.status(httpResponse.badRequest).send(validationError);
  }

  const user = await createNewUser(body);
  const token = jwtHelpers.generateToken(user);

  res.status(httpResponse.created).json({ token: token });
}

export default registerUser;
