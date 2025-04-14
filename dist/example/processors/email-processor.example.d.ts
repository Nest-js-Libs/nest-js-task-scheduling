import { Logger } from '@nestjs/common';
import { Job } from 'bull';
export declare class EmailProcessor {
    private readonly logger;
    constructor(logger: Logger);
    handleSendEmail(job: Job<any>): Promise<{
        success: boolean;
        message: string;
    }>;
}
