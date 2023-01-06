import { Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @UseGuards()
  @Post()
  async sendMailResetPassword(@CurrentUser() user: { id }) {
    await this.mailService.sendUserConfirmation(user.id);
  }
}
