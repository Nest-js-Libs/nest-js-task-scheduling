"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchedulingService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
let TaskSchedulingService = class TaskSchedulingService {
    constructor(emailQueue, fileProcessingQueue, dataSyncQueue, scheduledTasksQueue, logger) {
        this.emailQueue = emailQueue;
        this.fileProcessingQueue = fileProcessingQueue;
        this.dataSyncQueue = dataSyncQueue;
        this.scheduledTasksQueue = scheduledTasksQueue;
        this.logger = logger;
    }
    async addEmailJob(data, options) {
        try {
            const jobOptions = Object.assign({ removeOnComplete: true, removeOnFail: false }, options);
            const job = await this.emailQueue.add('send-email', data, jobOptions);
            if (jobOptions.delay) {
                this.logger.log(`Job added to email queue with id: ${job.id}, delay: ${jobOptions.delay}ms`);
            }
            else {
                this.logger.log(`Job added to email queue with id: ${job.id}`);
            }
            return job;
        }
        catch (error) {
            this.logger.error(`Error adding job to email queue: ${error.message}`, error.stack);
            throw error;
        }
    }
    async addFileProcessingJob(data, options) {
        try {
            const jobOptions = Object.assign({ removeOnComplete: true, removeOnFail: false }, options);
            const job = await this.fileProcessingQueue.add('process-file', data, jobOptions);
            if (jobOptions.delay) {
                this.logger.log(`Job added to file processing queue with id: ${job.id}, delay: ${jobOptions.delay}ms`);
            }
            else {
                this.logger.log(`Job added to file processing queue with id: ${job.id}`);
            }
            return job;
        }
        catch (error) {
            this.logger.error(`Error adding job to file processing queue: ${error.message}`, error.stack);
            throw error;
        }
    }
    async addDataSyncJob(data, options) {
        try {
            const jobOptions = Object.assign({ removeOnComplete: true, removeOnFail: false }, options);
            const job = await this.dataSyncQueue.add('sync-data', data, jobOptions);
            if (jobOptions.delay) {
                this.logger.log(`Job added to data sync queue with id: ${job.id}, delay: ${jobOptions.delay}ms`);
            }
            else {
                this.logger.log(`Job added to data sync queue with id: ${job.id}`);
            }
            return job;
        }
        catch (error) {
            this.logger.error(`Error adding job to data sync queue: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getJob(queueName, jobId) {
        try {
            let queue;
            switch (queueName) {
                case 'email':
                    queue = this.emailQueue;
                    break;
                case 'file-processing':
                    queue = this.fileProcessingQueue;
                    break;
                case 'data-sync':
                    queue = this.dataSyncQueue;
                    break;
                case 'scheduled-tasks':
                    queue = this.scheduledTasksQueue;
                    break;
                default:
                    throw new Error(`Queue ${queueName} not found`);
            }
            return await queue.getJob(jobId);
        }
        catch (error) {
            this.logger.error(`Error getting job: ${error.message}`, error.stack);
            throw error;
        }
    }
    async removeJob(queueName, jobId) {
        try {
            const job = await this.getJob(queueName, jobId);
            if (job) {
                await job.remove();
                this.logger.log(`Job ${jobId} removed from ${queueName} queue`);
                return true;
            }
            return false;
        }
        catch (error) {
            this.logger.error(`Error removing job: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.TaskSchedulingService = TaskSchedulingService;
exports.TaskSchedulingService = TaskSchedulingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('email')),
    __param(1, (0, bull_1.InjectQueue)('file-processing')),
    __param(2, (0, bull_1.InjectQueue)('data-sync')),
    __param(3, (0, bull_1.InjectQueue)('scheduled-tasks')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, common_1.Logger])
], TaskSchedulingService);
//# sourceMappingURL=task-scheduling.service.js.map