import { Logger } from '@nestjs/common';
import { Job } from 'bull';
export declare class FileProcessor {
    private readonly logger;
    constructor(logger: Logger);
    handleFileProcessing(job: Job<any>): Promise<{
        success: boolean;
        message: string;
        outputPath: string;
    }>;
}
