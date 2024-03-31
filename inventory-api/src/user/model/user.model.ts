import { IStore } from 'src/store/model/store.model';

export interface IUser {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  docNumber: string;
  docType: 'CC' | 'CE' | 'LICENCIA';
  password: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  retry?: number;
  stores?: IStore[];
  refreshToken?: string;
}
