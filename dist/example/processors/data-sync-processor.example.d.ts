import { Logger } from '@nestjs/common';
import { Job } from 'bull';
export declare class DataSyncProcessor {
    private readonly logger;
    constructor(logger: Logger);
    handleDataSync(job: Job<any>): Promise<{
        success: boolean;
        message: string;
        recordsProcessed: number;
    }>;
}
