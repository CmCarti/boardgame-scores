import User, { UserCreationModel } from '../../../data/models/User';
import userRepository from '../../../data/repositories/userRepository';
import bcrypt from 'bcryptjs';
import jwtHelpers from '../../../helpers/jwtHelpers';

export default async function createNewUser(body: User): Promise<User> {
  const encryptedPassword = await bcrypt.hash(body.password, 10);

  const user: UserCreationModel = {
    email: body.email,
    password: encryptedPassword,
  };

  const newUser = await userRepository.add(user);

  return newUser;
}
