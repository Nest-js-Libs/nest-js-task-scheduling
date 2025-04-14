import { Module } from '@nestjs/common';
import { TaskSchedulingController } from './task-scheduling.controller';
import { TaskSchedulingService } from './services/task-scheduling.service';
import { DataSyncProcessor } from './processors/data-sync-processor.example';
import { EmailProcessor } from './processors/email-processor.example';
import { FileProcessor } from './processors/file-processor.example';
import { TaskSchedulingModule } from 'src/lib/task-scheduling.module';

@Module({
  imports: [
    TaskSchedulingModule.forRoot({
      queues: ['email', 'file-processing', 'data-sync', 'scheduled-tasks']
    }),
  ],
  controllers: [TaskSchedulingController],
  providers: [
    TaskSchedulingService,
    DataSyncProcessor,
    EmailProcessor,
    FileProcessor,
  ],
  exports: [],
})
export class TaskSchedulingModuleExample {}
