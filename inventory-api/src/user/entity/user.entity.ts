import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../model/user.model';

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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
