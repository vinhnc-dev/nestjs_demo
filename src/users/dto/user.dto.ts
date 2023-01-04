import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

const stringToArray = ({ value }) => {
  if (typeof value === 'string') {
    return value.split(',').filter((element) => element.length >= 5);
  }
};
export class OutputDto {
  @IsArray()
  @Transform(stringToArray)
  @ApiProperty()
  result: string[];
}

export class GetUserOutput {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  role: string;
}
