import LoginRequestBody from '../../../data/models/LoginRequestbody';
import User from '../../../data/models/User';
import userRepository from '../../../data/repositories/userRepository';

export default function validateLoginRequest(body: LoginRequestBody): string {
  if (!body || !body.email || !body.password) {
    return 'You must supply a username and password';
  }

  return '';
}
