import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { RegisterInput } from '../auth/dto/register.input';
import { Repository } from 'typeorm';
import { OutputDto } from './dto/user.dto';
import { ROLE } from './users.constant';
import { User } from './users.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
      ) {}

    async getUserByEmail(email: string): Promise<User> {                        
        const user = await this.usersRepository.findOne({
            where: {
                email: email
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

    async getArray(input: string): Promise<any> {  
                          
        const result = plainToInstance(OutputDto, {result: input});
        return result.result
    }
}
