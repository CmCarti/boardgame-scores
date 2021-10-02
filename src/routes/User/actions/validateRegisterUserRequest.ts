import User from '../../../data/models/User';
import userRepository from '../../../data/repositories/userRepository';

export default async function validateRegisterUserRequest(body: User): Promise<string> {
  if (!body || !body.email || !body.password) {
    return 'You must include an email and password';
  }

  const checkForExisting = await userRepository.find(`email = '${body.email}'`);

  if (checkForExisting && checkForExisting.length) {
    return 'User already exists';
  }

  return '';
}
