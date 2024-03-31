import { IUser } from 'src/user/model/user.model';

export interface IStore {
  id?: number;
  name: string;
  address: string;
  email?: string;
  phoneNumber: string;
  userId?: number;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
