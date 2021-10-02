import { Request, Response } from 'express';

function getUsers(req: Request, res: Response) {
  res.send("You're getting all the users");
}

export default getUsers;
