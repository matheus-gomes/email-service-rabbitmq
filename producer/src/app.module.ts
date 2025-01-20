import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitMQModule,
    EmailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
