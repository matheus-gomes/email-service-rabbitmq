import { Module } from '@nestjs/common';
import { EmailsService } from './business/emails.service';
import { EmailsController } from './controller/emails.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
