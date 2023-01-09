import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { sendMailOption } from './mail.model';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendLinkResetPassword(sendMailOption: sendMailOption) {
    console.log(sendMailOption);

    await this.mailerService.sendMail(sendMailOption);
  }
}
