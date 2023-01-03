import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { OutputValidator } from './output.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtService, OutputValidator],
  exports: [UserService],
})
export class UsersModule {}
