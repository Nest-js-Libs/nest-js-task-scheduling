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
exports.EmailProcessor = void 0;
const common_1 = require("@nestjs/common");
const task_processor_decorators_1 = require("../../lib/decorators/task-processor.decorators");
let EmailProcessor = class EmailProcessor {
    constructor(logger) {
        this.logger = logger;
    }
    async handleSendEmail(job) {
        this.logger.log(`Processing email job ${job.id}`);
        const { to, subject } = job.data;
        try {
            this.logger.log(`Sending email to ${to} with subject: ${subject}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await job.progress(100);
            this.logger.log(`Email sent successfully to ${to}`);
            return { success: true, message: 'Email sent successfully' };
        }
        catch (error) {
            this.logger.error(`Failed to send email: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.EmailProcessor = EmailProcessor;
__decorate([
    (0, task_processor_decorators_1.TaskProcess)('send-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailProcessor.prototype, "handleSendEmail", null);
exports.EmailProcessor = EmailProcessor = __decorate([
    (0, task_processor_decorators_1.TaskProcessor)('email'),
    __metadata("design:paramtypes", [common_1.Logger])
], EmailProcessor);
//# sourceMappingURL=email-processor.example.js.map