import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFilesService {

    async upload(file: Express.Multer.File): Promise<void> {   
        const currentTimeString = new Date().getTime()             
        const fileName: string = `${currentTimeString}-avatar`;        
    }
}
