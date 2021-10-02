import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import httpResponse from '../helpers/httpResponse';

function auth(req: Request, res: Response, next: NextFunction) {
  const anonymousRoutes = ['/login', '/register'];
  if (anonymousRoutes.includes(req.path)) return next();

  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    return res.status(httpResponse.forbidden).send('You must use a bearer token to make requests');
  }
  const authHeaderSections = authHeader.split(' ');
  const token = authHeaderSections[authHeaderSections.length - 1];
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY || '');
    req.user = decodedToken as { userId: number; email: string };
  } catch (err) {
    return res.status(httpResponse.unauthorized).send('Invalid token');
  }
  return next();
}

export default auth;
