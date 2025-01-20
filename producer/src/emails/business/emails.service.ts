import { Injectable } from '@nestjs/common';
import { EmailDTO } from '../dto/email.dto';
import { RabbitMQService } from 'src/rabbitmq/business/rabbitmq.service';

@Injectable()
export class EmailsService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async sendEmail(emailDTO: EmailDTO) {
    await this.rabbitMQService.assertExchange(process.env.EXCHANGE_NAME, 'direct', { durable: true });
    await this.rabbitMQService.publish(process.env.EXCHANGE_NAME, '', JSON.stringify(emailDTO));
  }
}
