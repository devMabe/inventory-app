import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICategory } from '../model/category.model';
import { Store } from 'src/store/entity/store.entity';
import { Item } from 'src/item/entity/item.entity';

@Entity()
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(() => Store, (store) => store.categories)
  store?: Store;

  @OneToMany(() => Item, (item) => item.category)
  items?: Item[];

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
