import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFilesService } from './upload-files.service';
import { Express } from 'express';
import { option } from './upload-files.options';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('upload-files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', option))
  async uploadFiles(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: { id }
  ) {
    return this.uploadFilesService.updateAvatarForUser(file, user.id);
  }
}
