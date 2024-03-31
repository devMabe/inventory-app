import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IStore } from '../model/store.model';
import { User } from 'src/user/entity/user.entity';
import { Category } from 'src/category/entity/category.entity';

@Entity()
export class Store implements IStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email?: string;

  @Column()
  phoneNumber: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @OneToMany(() => Category, (category) => category.store)
  categories?: Category[];

  @ManyToOne(() => User, (user) => user.stores)
  user: User;
}
