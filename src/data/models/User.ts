export default interface User {
  email: string;
  password: string;
  id: number;
}

export interface UserCreationModel extends Omit<User, 'id'> {}
