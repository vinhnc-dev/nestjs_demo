import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UserService } from 'src/users/users.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService
  ) {}
  async sendLinkResetPassword(userId: number) {
    const user = await this.userService.getUserById(userId);
    const url = `${process.env.DOMAIN}?resetToken=${user.resetPasswordToken}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Please change your password via the link below.',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
