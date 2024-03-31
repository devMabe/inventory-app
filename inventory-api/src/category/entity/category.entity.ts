import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ICategory } from '../model/category.model';
import { Store } from 'src/store/entity/store.entity';

@Entity()
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(() => Store, (store) => store.categories)
  store?: Store;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
