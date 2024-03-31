import { IStore } from 'src/store/model/store.model';

export interface ICategory {
  id?: number;
  name: string;
  store?: IStore;
  createdAt?: Date;
  updatedAt?: Date;
}
