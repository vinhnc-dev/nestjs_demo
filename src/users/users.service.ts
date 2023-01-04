import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { RegisterInput } from '../auth/dto/register.input';
import { createQueryBuilder, Repository } from 'typeorm';
import { OutputDto } from './dto/user.dto';
import { ROLE } from './users.constant';
import { User } from './users.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
      ) {}

    async getUser(id: number){
        const user = await this.usersRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.images', 'images')
        .where('user.id = :id', {id: id})
        .getOne()   
        
        return user;
    }

    async getUserByEmail(email: string): Promise<User> {                        
        const user = await this.usersRepository.findOne({
            where: {
                email: email,
            }
        });                   
        return user;
    }

    async getUserById(id: number): Promise<User> {                        
        const user = await this.usersRepository.findOne({
            where: {
                id: id,
            }
        });                   
        return user;
    }

    async createUser(data: RegisterInput) {
        const newUser = new User;
        newUser.email = data.email;
        newUser.password = data.password;
        newUser.name = data.name;
        newUser.role = ROLE.USER;
        newUser.phone = data.phone;
        await this.usersRepository.save(newUser)
    }
}
