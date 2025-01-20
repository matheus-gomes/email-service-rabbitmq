import { Controller, Post, Body } from '@nestjs/common';
import { EmailsService } from '../business/emails.service';
import { EmailDTO } from '../dto/email.dto';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  sendEmail(@Body() emailDTO: EmailDTO) {
    return this.emailsService.sendEmail(emailDTO)
  }
}
