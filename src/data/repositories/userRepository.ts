import { QueryResult } from 'pg';
import db, { DbCallback } from '../databaseSetup';
import User, { UserCreationModel } from '../models/User';
import baseRepository, { BaseRepository } from './baseRepository';

interface UserRepository extends Omit<BaseRepository<User, UserCreationModel>, 'add'> {
  add: (user: UserCreationModel) => Promise<User>;
  updatePassword: (
    userId: number,
    currentPassword: string,
    newPassword: string
  ) => Promise<QueryResult<any>>;
  verifyPassword: (userId: number, password: string) => Promise<QueryResult<any>>;
}

const userRepository: UserRepository = {
  ...baseRepository<User, UserCreationModel>('users'),
  add: addUser,
  updatePassword,
  verifyPassword,
};

async function addUser(user: UserCreationModel): Promise<User> {
  await db.query(`Insert into users(email, password) values('${user.email}', '${user.password}')`);
  const { rows } = await db.query<User>(`select * from users where email = '${user.email}'`);
  return rows[0];
}

function updatePassword(
  userId: number,
  currentPassword: string,
  newPassword: string
): Promise<QueryResult<any>> {
  return db.query('Select * from users');
}

function verifyPassword(userId: number, password: string): Promise<QueryResult<any>> {
  return db.query('Select * from users');
}

export default userRepository;
