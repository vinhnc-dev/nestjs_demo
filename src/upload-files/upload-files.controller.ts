import { Controller, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFilesService } from './upload-files.service';
import { diskStorage } from 'multer';
import e, { Express, request } from 'express';
import { extname } from 'path';


@Controller('upload-files')
export class UploadFilesController {
    constructor (private readonly uploadFilesService: UploadFilesService){}
    
    @Post('avatar')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: 'src/storage/avatars',
          filename: (request, file, callback) => {
            const currentTime = new Date().getTime();
            const filename = `${currentTime}-avatar`;
            callback(null, filename);
          },
        }),
      }))
    async uploadFiles(@UploadedFile() file: Express.Multer.File){        
        return true;
    }

    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
        uploadFileAndPassValidation(
        @UploadedFile(
            new ParseFilePipe({
            validators: [
                // ... Set of file validator instances here
            ]
            })
        )
        file: Express.Multer.File,
        ) {
        return {
            file: file.buffer.toString(),
        };
    }
}
