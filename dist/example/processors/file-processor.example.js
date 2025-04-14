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
exports.FileProcessor = void 0;
const common_1 = require("@nestjs/common");
const task_processor_decorators_1 = require("../../lib/decorators/task-processor.decorators");
let FileProcessor = class FileProcessor {
    constructor(logger) {
        this.logger = logger;
    }
    async handleFileProcessing(job) {
        this.logger.log(`Processing file job ${job.id}`);
        const { filePath, processType } = job.data;
        try {
            await job.progress(10);
            this.logger.log(`Starting processing file: ${filePath}`);
            await new Promise(resolve => setTimeout(resolve, 500));
            await job.progress(30);
            this.logger.log('File read successfully');
            await new Promise(resolve => setTimeout(resolve, 1000));
            await job.progress(70);
            this.logger.log(`Applied ${processType} processing to file`);
            await new Promise(resolve => setTimeout(resolve, 500));
            await job.progress(100);
            this.logger.log(`File processing completed: ${filePath}`);
            return {
                success: true,
                message: 'File processed successfully',
                outputPath: `processed_${filePath}`,
            };
        }
        catch (error) {
            this.logger.error(`Failed to process file: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.FileProcessor = FileProcessor;
__decorate([
    (0, task_processor_decorators_1.TaskProcess)('process-file'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileProcessor.prototype, "handleFileProcessing", null);
exports.FileProcessor = FileProcessor = __decorate([
    (0, task_processor_decorators_1.TaskProcessor)('file-processing'),
    __metadata("design:paramtypes", [common_1.Logger])
], FileProcessor);
//# sourceMappingURL=file-processor.example.js.map