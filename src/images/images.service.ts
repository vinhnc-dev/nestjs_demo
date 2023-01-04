import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Image } from './images.entity';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Image)
        private readonly imagesRepository: Repository<Image>,
        private readonly usersService: UserService,
    ) {}

    async addImage(file: Express.Multer.File, userId: number) {
        const user = await this.usersService.getUserById(userId);   
        const newImage = new Image;
        newImage.filename = file.filename;                        
        newImage.originalname = file.originalname;                        
        newImage.path = file.path;                        
        newImage.size = file.size;
        newImage.user = user;

        await this.imagesRepository.save(newImage);                   
    }
}
