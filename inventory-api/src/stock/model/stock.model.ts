import { IItem } from 'src/item/model/item.model';

export interface IStock {
  id?: number;
  quantity: number;
  item?: IItem;
  createdAt?: Date;
  updatedAt?: Date;
}
