import { IItem } from 'src/item/model/item.model';
import { IStore } from 'src/store/model/store.model';
export interface ICategory {
  id?: number;
  name: string;
  store?: IStore;
  items?: IItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
