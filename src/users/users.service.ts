import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterInput } from '../auth/dto/register.input';
import { Repository } from 'typeorm';
import { ROLE } from './users.constant';
import { User } from './users.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly mailService: MailService
  ) {}

  async getUser(id: number) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.images', 'images')
      .where('user.id = :id', { id: id })
      .getOne();

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  async createUser(data: RegisterInput) {
    const newUser = new User();
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.name = data.name;
    newUser.role = ROLE.USER;
    newUser.phone = data.phone;
    await this.usersRepository.save(newUser);
  }

  async getLinkResetPassword(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException('User is not exist!', HttpStatus.BAD_REQUEST);
    }

    const resetPasswordToken = Math.random().toString(36).substr(2);

    user.resetPasswordToken = resetPasswordToken;
    await this.usersRepository.save(user);
    await this.mailService.sendLinkResetPassword;
  }
}
