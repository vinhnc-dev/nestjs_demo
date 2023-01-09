import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class getLinkResetPasswordInput {
  @IsString()
  @MaxLength(60)
  @ApiProperty()
  email: string;
}

export class resetPasswordInput {
  @IsString()
  @MaxLength(60)
  @ApiProperty()
  newPassword: string;
}
