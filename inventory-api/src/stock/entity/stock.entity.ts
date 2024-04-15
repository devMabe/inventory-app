import { IItem } from 'src/item/model/item.model';
import { IStock } from '../model/stock.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from 'src/item/entity/item.entity';

@Entity()
export class Stock implements IStock {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  quantity: number;

  @OneToOne(() => Item)
  @JoinColumn()
  item?: IItem;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
