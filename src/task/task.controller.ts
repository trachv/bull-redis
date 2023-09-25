import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, Body } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('tasks')
export class TaskController {
  constructor(@InjectQueue('example-queue') private readonly queue: Queue) {}

  @Post('process')
  async createProcessTask(@Body() data: any) {
    const job = await this.queue.add('process-job', data);
    return { jobId: job.id };
  }
}
