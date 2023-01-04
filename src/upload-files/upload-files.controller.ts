import { Controller, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFilesService } from './upload-files.service';
import { Express } from 'express';
import { option } from './upload-files.options';


@Controller('upload-files')
export class UploadFilesController {
  constructor (private readonly uploadFilesService: UploadFilesService){}
  
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', option))
  async uploadFiles(@UploadedFile() file: Express.Multer.File){        
    return this.uploadFilesService.updateAvatarForUser(file, 1);
  }
}
