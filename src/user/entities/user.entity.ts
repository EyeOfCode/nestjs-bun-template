import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

@Index(['id'])
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;
}
