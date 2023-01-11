import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadFilesService } from './upload-files.service';
import { Express } from 'express';
import { optionAvatars, optionImages } from './upload-files.options';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('upload-files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', optionAvatars))
  async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @CurrentUser() user: { id }
  ) {
    // return this.uploadFilesService.updateImagesForUser(avatar, user.id);
  }

  @Post('images/:classify')
  @UseInterceptors(FilesInterceptor('images', 3, optionImages))
  async uploadFiles(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @CurrentUser() user: { id: number },
    @Param() param: { classify: string }
  ) {
    return this.uploadFilesService.updateImagesForUser(
      images,
      user.id,
      param.classify
    );
  }
}
