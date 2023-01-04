import { IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Image } from "src/images/images.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ROLE } from "./users.constant";

@Entity('users')
export class User{
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  phone: string;

  @Column()
  @IsEnum(ROLE)
  role: string;

  @Column({ name : 'created_at'})
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @OneToMany(() => Image, (images) => images.user)
  images: Image[]
}
