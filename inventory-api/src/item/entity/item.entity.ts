import { ICategory } from 'src/category/model/category.model';
import { IItem } from '../model/item.model';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from 'src/category/entity/category.entity';
import { Stock } from 'src/stock/entity/stock.entity';

@Entity()
export class Item implements IItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  image?: string;

  @ManyToOne(() => Category, (category) => category.items)
  category?: ICategory;

  @OneToOne(() => Stock, (stock) => stock.item)
  stock?: Stock;

  @Column()
  price: number;

  @Column({ default: true })
  active?: boolean;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
