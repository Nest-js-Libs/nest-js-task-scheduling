export interface JobOptions {
    priority?: number;
    delay?: number;
    attempts?: number;
    backoff?: number | {
        type: string;
        delay: number;
    };
    removeOnComplete?: boolean | number;
    removeOnFail?: boolean | number;
    repeat?: {
        cron?: string;
        every?: number;
        limit?: number;
    };
}
export interface EmailJobData {
    to: string | string[];
    from?: string;
    subject: string;
    text?: string;
    html?: string;
    attachments?: Array<{
        filename: string;
        content?: any;
        path?: string;
    }>;
}
export interface FileProcessingJobData {
    filePath: string;
    processType: 'parse' | 'convert' | 'compress' | 'analyze';
    options?: Record<string, any>;
    outputPath?: string;
}
export interface DataSyncJobData {
    source: string;
    destination: string;
    dataType: string;
    options?: Record<string, any>;
}
export interface ScheduledTaskData {
    name: string;
    params?: Record<string, any>;
}
