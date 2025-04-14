import { DataSyncJobDto, EmailJobDto, FileProcessingJobDto } from './dto/task.dto';
import { TaskSchedulingService } from './services/task-scheduling.service';
export declare class TaskSchedulingController {
    private readonly taskSchedulingService;
    constructor(taskSchedulingService: TaskSchedulingService);
    scheduleEmailTask(data: EmailJobDto, delay?: number): Promise<{
        jobId: import("bull").JobId;
        status: string;
        delay: number;
        removeOnComplete: number | boolean;
        removeOnFail: number | boolean;
    }>;
    scheduleFileProcessingTask(data: FileProcessingJobDto, delay?: number): Promise<{
        jobId: import("bull").JobId;
        status: string;
        delay: number;
        removeOnComplete: number | boolean;
        removeOnFail: number | boolean;
    }>;
    scheduleDataSyncTask(data: DataSyncJobDto, delay?: number): Promise<{
        jobId: import("bull").JobId;
        status: string;
        delay: number;
        removeOnComplete: number | boolean;
        removeOnFail: number | boolean;
    }>;
    getJob(queue: string, jobId: string): Promise<{
        status: string;
        jobId?: undefined;
        data?: undefined;
        progress?: undefined;
    } | {
        jobId: import("bull").JobId;
        status: import("bull").JobStatus | "stuck";
        data: any;
        progress: any;
    }>;
    removeJob(queue: string, jobId: string): Promise<{
        success: boolean;
    }>;
}
