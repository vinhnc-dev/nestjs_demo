import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendUserConfirmation(user: User, token: string) {
    const url = `google.com`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
