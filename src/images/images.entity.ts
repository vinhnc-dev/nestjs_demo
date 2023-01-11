import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  filename: string;

  @Column()
  @IsString()
  originalname: string;

  @Column()
  @IsEmail()
  path: string;

  @Column()
  @IsInt()
  size: number;

  @Column()
  @IsString()
  classify: string;

  @Column({ name: 'created_at' })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ManyToOne(() => User, (user) => user.images, {
    cascade: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
