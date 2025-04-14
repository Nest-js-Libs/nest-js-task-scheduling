export declare class JobOptionsDto {
    priority?: number;
    attempts?: number;
    removeOnComplete?: boolean | number;
    removeOnFail?: boolean | number;
    backoff?: number;
}
export declare class EmailAttachmentDto {
    filename: string;
    content?: any;
    path?: string;
}
export declare class EmailJobDto {
    to: string | string[];
    from?: string;
    subject: string;
    text?: string;
    html?: string;
    attachments?: EmailAttachmentDto[];
    options?: JobOptionsDto;
    delay?: number;
}
export declare class FileProcessingJobDto {
    filePath: string;
    processType: 'parse' | 'convert' | 'compress' | 'analyze';
    options?: Record<string, any>;
    outputPath?: string;
    jobOptions?: JobOptionsDto;
    delay?: number;
}
export declare class DataSyncJobDto {
    source: string;
    destination: string;
    dataType: string;
    options?: Record<string, any>;
    jobOptions?: JobOptionsDto;
    delay?: number;
}
export declare class ScheduledTaskDto {
    name: string;
    params?: Record<string, any>;
    options?: JobOptionsDto;
}
export declare class DelayedTaskParamsDto {
    delayMs: number;
}
