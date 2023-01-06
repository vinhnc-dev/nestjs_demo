import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Image } from 'src/images/images.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from './users.constant';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  @MaxLength(60)
  name: string;

  @Column()
  @IsEmail()
  @MaxLength(60)
  email: string;

  @Column()
  @IsString()
  @MaxLength(60)
  password: string;

  @Column()
  @IsString()
  @MaxLength(15)
  phone: string;

  @Column()
  @IsEnum(ROLE)
  role: string;

  @Column({ name: 'reset_password_token' })
  @IsString()
  @MaxLength(11)
  resetPasswordToken: string;

  @Column({ name: 'created_at' })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @OneToMany(() => Image, (images) => images.user)
  images: Image[];
}
