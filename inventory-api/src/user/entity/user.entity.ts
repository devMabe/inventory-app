import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IUser } from '../model/user.model';
import { Store } from 'src/store/entity/store.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  docNumber: string;

  @Column()
  docType: 'CC' | 'CE' | 'LICENCIA';

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  retry?: number;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Store, (store) => store.user)
  stores: Store[];
}
