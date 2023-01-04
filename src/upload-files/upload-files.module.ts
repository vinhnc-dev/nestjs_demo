import { Module } from '@nestjs/common';
import { ImagesModule } from 'src/images/images.module';
import { UploadFilesController } from './upload-files.controller';
import { UploadFilesService } from './upload-files.service';

@Module({
  controllers: [UploadFilesController],
  providers: [UploadFilesService],
  imports: [ImagesModule],
})
export class UploadFilesModule {}
