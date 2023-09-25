import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskProcessor } from './task.processor';
import { TaskController } from './task.controller';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'example-queue',
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  providers: [TaskProcessor],
  controllers: [TaskController],
})
export class TaskModule {}
