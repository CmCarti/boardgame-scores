import User, { UserCreationModel } from '../../../data/models/User';
import userRepository from '../../../data/repositories/userRepository';
import bcrypt from 'bcryptjs';
import jwtHelpers from '../../../helpers/jwtHelpers';

export default async function getUserByEmail(email: string): Promise<User | null> {
  const rows = await userRepository.find(`where email='${email}'`);
  if (!rows || !rows.length) return null;
  const user = rows[0];
  return user;
}
