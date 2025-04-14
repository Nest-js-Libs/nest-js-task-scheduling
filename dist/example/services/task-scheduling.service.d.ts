import { Logger } from '@nestjs/common';
import { Queue, JobOptions } from 'bull';
import { DataSyncJobData, EmailJobData, FileProcessingJobData } from 'src/lib/interfaces/task.interfaces';
export declare class TaskSchedulingService {
    private readonly emailQueue;
    private readonly fileProcessingQueue;
    private readonly dataSyncQueue;
    private readonly scheduledTasksQueue;
    private readonly logger;
    constructor(emailQueue: Queue, fileProcessingQueue: Queue, dataSyncQueue: Queue, scheduledTasksQueue: Queue, logger: Logger);
    addEmailJob(data: EmailJobData, options?: JobOptions): Promise<import("bull").Job<any>>;
    addFileProcessingJob(data: FileProcessingJobData, options?: JobOptions): Promise<import("bull").Job<any>>;
    addDataSyncJob(data: DataSyncJobData, options?: JobOptions): Promise<import("bull").Job<any>>;
    getJob(queueName: string, jobId: string): Promise<import("bull").Job<any>>;
    removeJob(queueName: string, jobId: string): Promise<boolean>;
}
