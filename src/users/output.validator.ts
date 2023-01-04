import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OutputDto } from './dto/user.dto';

@Injectable()
export class OutputValidator {
  public async validate(input: string): Promise<string[]> {
    if (typeof input === 'string') {
      return input.split(',').filter((element) => element.length >= 5);
    }
    return [];
  }
}
