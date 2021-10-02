import jwt from 'jsonwebtoken';
import User from '../data/models/User';

export interface JWTToken {}

function generateToken(user: User): string {
  const token = jwt.sign(
    { uemail: user.email, userId: user.id },
    process.env.TOKEN_KEY != undefined ? process.env.TOKEN_KEY : '',
    {
      expiresIn: '2h',
    }
  );
  return token;
}

export default {
  generateToken,
};
