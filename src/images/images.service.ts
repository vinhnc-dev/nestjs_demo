import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Image } from './images.entity';
import { CLASSIFY } from './images.constant';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
    private readonly usersService: UserService
  ) {}

  async addImage(file: Express.Multer.File, userId: number, classify: string) {
    const user = await this.usersService.getUserById(userId);
    const newImage = new Image();
    newImage.filename = file.filename;
    newImage.originalname = file.originalname;
    newImage.path = file.path;
    newImage.size = file.size;
    newImage.user = user;
    newImage.classify = classify;
    await this.imagesRepository.save(newImage);
  }

  async addImages(
    images: Array<Express.Multer.File>,
    userId: number,
    classify: string
  ) {
    const user = await this.usersService.getUserById(userId);
    const newImages = [];
    images.map((image) => {
      const newImage = new Image();
      newImage.filename = image.filename;
      newImage.originalname = image.originalname;
      newImage.path = image.path;
      newImage.size = image.size;
      newImage.user = user;
      switch (classify) {
        case 'avatar':
          newImage.classify = CLASSIFY.AVATAR;
          break;
        case 'cover':
          newImage.classify = CLASSIFY.COVER;
          break;
        case 'post':
          newImage.classify = CLASSIFY.POST;
          break;
      }
      newImages.push(newImage);
    });

    await this.imagesRepository.save(newImages);
  }
}
