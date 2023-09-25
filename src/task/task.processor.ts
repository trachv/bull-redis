import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('example-queue')
export class TaskProcessor {
  @Process('process-job')
  async handleProcessJob(job: Job<any>) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(`Processing job ${job.id} with data: ${job.data}`);
  }
}
