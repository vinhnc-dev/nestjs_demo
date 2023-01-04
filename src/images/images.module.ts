import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Image } from './images.entity';
import { ImagesService } from './images.service';

@Module({
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([Image]), UsersModule],
  exports: [ImagesService]
})
export class ImagesModule {}
