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
exports.TaskSchedulingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const task_dto_1 = require("./dto/task.dto");
const task_scheduling_service_1 = require("./services/task-scheduling.service");
let TaskSchedulingController = class TaskSchedulingController {
    constructor(taskSchedulingService) {
        this.taskSchedulingService = taskSchedulingService;
    }
    async scheduleEmailTask(data, delay) {
        const options = Object.assign(Object.assign({}, data.options), { delay: delay || data.delay });
        const job = await this.taskSchedulingService.addEmailJob(data, options);
        return {
            jobId: job.id,
            status: 'scheduled',
            delay: options.delay,
            removeOnComplete: options.removeOnComplete,
            removeOnFail: options.removeOnFail,
        };
    }
    async scheduleFileProcessingTask(data, delay) {
        const options = Object.assign(Object.assign({}, data.jobOptions), { delay: delay || data.delay });
        const job = await this.taskSchedulingService.addFileProcessingJob(data, options);
        return {
            jobId: job.id,
            status: 'scheduled',
            delay: options.delay,
            removeOnComplete: options.removeOnComplete,
            removeOnFail: options.removeOnFail,
        };
    }
    async scheduleDataSyncTask(data, delay) {
        const options = Object.assign(Object.assign({}, data.jobOptions), { delay: delay || data.delay });
        const job = await this.taskSchedulingService.addDataSyncJob(data, options);
        return {
            jobId: job.id,
            status: 'scheduled',
            delay: options.delay,
            removeOnComplete: options.removeOnComplete,
            removeOnFail: options.removeOnFail,
        };
    }
    async getJob(queue, jobId) {
        const job = await this.taskSchedulingService.getJob(queue, jobId);
        if (!job) {
            return { status: 'not_found' };
        }
        return {
            jobId: job.id,
            status: await job.getState(),
            data: job.data,
            progress: job.progress(),
        };
    }
    async removeJob(queue, jobId) {
        const removed = await this.taskSchedulingService.removeJob(queue, jobId);
        return { success: removed };
    }
};
exports.TaskSchedulingController = TaskSchedulingController;
__decorate([
    (0, common_1.Post)('email'),
    (0, swagger_1.ApiOperation)({ summary: 'Programar un envío de correo electrónico' }),
    (0, swagger_1.ApiQuery)({
        name: 'delay',
        required: false,
        description: 'Retraso en milisegundos antes de procesar el trabajo',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('delay')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.EmailJobDto, Number]),
    __metadata("design:returntype", Promise)
], TaskSchedulingController.prototype, "scheduleEmailTask", null);
__decorate([
    (0, common_1.Post)('file-processing'),
    (0, swagger_1.ApiOperation)({ summary: 'Programar un procesamiento de archivo' }),
    (0, swagger_1.ApiQuery)({
        name: 'delay',
        required: false,
        description: 'Retraso en milisegundos antes de procesar el trabajo',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('delay')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.FileProcessingJobDto, Number]),
    __metadata("design:returntype", Promise)
], TaskSchedulingController.prototype, "scheduleFileProcessingTask", null);
__decorate([
    (0, common_1.Post)('data-sync'),
    (0, swagger_1.ApiOperation)({ summary: 'Programar una sincronización de datos' }),
    (0, swagger_1.ApiQuery)({
        name: 'delay',
        required: false,
        description: 'Retraso en milisegundos antes de procesar el trabajo',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('delay')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.DataSyncJobDto, Number]),
    __metadata("design:returntype", Promise)
], TaskSchedulingController.prototype, "scheduleDataSyncTask", null);
__decorate([
    (0, common_1.Get)(':queue/:jobId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener información de una tarea programada' }),
    (0, swagger_1.ApiParam)({ name: 'queue', description: 'Nombre de la cola' }),
    (0, swagger_1.ApiParam)({ name: 'jobId', description: 'ID del trabajo' }),
    __param(0, (0, common_1.Param)('queue')),
    __param(1, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskSchedulingController.prototype, "getJob", null);
__decorate([
    (0, common_1.Delete)(':queue/:jobId'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una tarea programada' }),
    (0, swagger_1.ApiParam)({ name: 'queue', description: 'Nombre de la cola' }),
    (0, swagger_1.ApiParam)({ name: 'jobId', description: 'ID del trabajo' }),
    __param(0, (0, common_1.Param)('queue')),
    __param(1, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskSchedulingController.prototype, "removeJob", null);
exports.TaskSchedulingController = TaskSchedulingController = __decorate([
    (0, swagger_1.ApiTags)('Task Scheduling Bull'),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [task_scheduling_service_1.TaskSchedulingService])
], TaskSchedulingController);
//# sourceMappingURL=task-scheduling.controller.js.map