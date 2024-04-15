import { ICategory } from 'src/category/model/category.model';
import { IStock } from 'src/stock/model/stock.model';

export interface IItem {
  id?: number;
  name: string;
  image?: string;
  category?: ICategory;
  stock?: IStock;
  price: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
