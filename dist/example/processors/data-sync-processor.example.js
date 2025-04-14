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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSyncProcessor = void 0;
const common_1 = require("@nestjs/common");
const task_processor_decorators_1 = require("../../lib/decorators/task-processor.decorators");
let DataSyncProcessor = class DataSyncProcessor {
    constructor(logger) {
        this.logger = logger;
    }
    async handleDataSync(job) {
        this.logger.log(`Processing data sync job ${job.id}`);
        const { source, destination, dataType } = job.data;
        try {
            await job.progress(10);
            this.logger.log(`Starting data sync from ${source} to ${destination}`);
            await new Promise(resolve => setTimeout(resolve, 800));
            await job.progress(30);
            this.logger.log(`Connected to ${source} and extracted ${dataType} data`);
            await new Promise(resolve => setTimeout(resolve, 600));
            await job.progress(60);
            this.logger.log('Data transformed successfully');
            await new Promise(resolve => setTimeout(resolve, 700));
            await job.progress(90);
            this.logger.log(`Data loaded into ${destination}`);
            await new Promise(resolve => setTimeout(resolve, 300));
            await job.progress(100);
            this.logger.log(`Data sync completed from ${source} to ${destination}`);
            return {
                success: true,
                message: 'Data synchronized successfully',
                recordsProcessed: Math.floor(Math.random() * 1000) + 1,
            };
        }
        catch (error) {
            this.logger.error(`Failed to sync data: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.DataSyncProcessor = DataSyncProcessor;
__decorate([
    (0, task_processor_decorators_1.TaskProcess)('sync-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataSyncProcessor.prototype, "handleDataSync", null);
exports.DataSyncProcessor = DataSyncProcessor = __decorate([
    (0, task_processor_decorators_1.TaskProcessor)('data-sync'),
    __metadata("design:paramtypes", [common_1.Logger])
], DataSyncProcessor);
//# sourceMappingURL=data-sync-processor.example.js.map