import { Injectable } from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class UploadFilesService {
  constructor(private readonly ImagesService: ImagesService) {}

  async updateImagesForUser(
    images: Array<Express.Multer.File>,
    userId: number,
    classify: string
  ): Promise<boolean> {
    await this.ImagesService.addImages(images, userId, classify);
    return true;
  }
}
