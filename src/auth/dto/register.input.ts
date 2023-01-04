import { IsEmail, IsString, MaxLength } from 'class-validator';

export class RegisterInput {
  @IsString()
  @MaxLength(60)
  name: string;

  @IsEmail()
  @MaxLength(60)
  email: string;

  @IsString()
  @MaxLength(60)
  password: string;

  @IsString()
  @MaxLength(15)
  phone: string;
}
