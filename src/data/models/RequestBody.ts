import { Request } from 'express';

export default interface RequestBody<T> extends Request {
  body: T;
}
