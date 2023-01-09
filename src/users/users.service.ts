import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterInput } from '../auth/dto/register.input';
import { Repository } from 'typeorm';
import { ROLE } from './users.constant';
import { User } from './users.entity';
import { MailService } from '../mail/mail.service';
import { resetPasswordInput } from './dto/reset-password.input';
import { sendMailOption } from '../mail/mail.model';

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

    const urlResetPassword = `${process.env.DOMAIN}/reset-pw?resetToken=${user.resetPasswordToken}`;
    const sendMailResetPasswordOption: sendMailOption = {
      to: user.email,
      subject: 'Please change your password via the link below.',
      template: './confirmation',
      context: {
        name: user.name,
        url: urlResetPassword,
      },
    };
    await this.mailService.sendLinkResetPassword(sendMailResetPasswordOption);
  }

  async isAllowResetPassword(token: string) {
    const user = await this.usersRepository.findOne({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!user) {
      throw new HttpException(
        'token reset is incorrect!',
        HttpStatus.BAD_REQUEST
      );
    }
    return true;
  }

  async resetPassword(token: string, input: resetPasswordInput) {
    const user = await this.usersRepository.findOne({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!user) {
      throw new HttpException(
        'token reset is incorrect!',
        HttpStatus.BAD_REQUEST
      );
    }

    user.password = input.newPassword;
    await this.usersRepository.save(user);
    return true;
  }
}
