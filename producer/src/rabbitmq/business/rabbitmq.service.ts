import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqplib from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqplib.Connection;
  private channel: amqplib.Channel;

  async onModuleInit() {
    this.connection = await amqplib.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    console.log('[RabbitMQ] Connected and channel created');
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
    console.log('[RabbitMQ] Connection closed');
  }

  async assertExchange(exchangeName: string, type: 'direct' | 'topic' | 'fanout', options?: amqplib.Options.AssertExchange) { 
    await this.channel.assertExchange(exchangeName, type, options);
  }

  async publish(exchangeName: string, routingKey: string, message: string) {
    console.log(exchangeName);
    this.channel.publish(exchangeName, routingKey, Buffer.from(message));
    console.log(`[RabbitMQ] Message published to exchange "${exchangeName}" with routingKey "${routingKey}": `, message);
  }

  async assertQueue(queueName: string, options?: amqplib.Options.AssertQueue) {
    await this.channel.assertQueue(queueName, options);
  }

  async bindQueue(queueName: string, exchageName: string, pattern: string) {
    await this.channel.bindQueue(queueName, exchageName, pattern);
  }

  async consume(queueName: string, onMessage: (msg: amqplib.ConsumeMessage) => void) {
    await this.channel.consume(queueName, (msg) => {
      if (msg) {
        onMessage(msg);
        this.channel.ack(msg);
      }
    })
  }
  
}
