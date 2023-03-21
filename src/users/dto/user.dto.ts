import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

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

export class GetNewCounselingBookingsInput {
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  @Min(0)
  maxCounselingBookingId: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  @Min(1)
  @Max(100)
  limit? = 50;
}
