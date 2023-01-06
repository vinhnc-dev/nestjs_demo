import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordInput {
  @IsString()
  @MaxLength(60)
  @ApiProperty()
  email: string;
}
