import { Injectable } from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class UploadFilesService {
    constructor(
        private readonly ImagesService: ImagesService,
      ) {}

    async updateAvatarForUser(file: Express.Multer.File, userId: number): Promise<void> {   
      await this.ImagesService.addImage(file, userId)
    }
}
