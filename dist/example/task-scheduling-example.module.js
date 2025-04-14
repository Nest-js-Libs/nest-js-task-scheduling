"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchedulingModuleExample = void 0;
const common_1 = require("@nestjs/common");
const task_scheduling_controller_1 = require("./task-scheduling.controller");
const task_scheduling_service_1 = require("./services/task-scheduling.service");
const data_sync_processor_example_1 = require("./processors/data-sync-processor.example");
const email_processor_example_1 = require("./processors/email-processor.example");
const file_processor_example_1 = require("./processors/file-processor.example");
const task_scheduling_module_1 = require("../lib/task-scheduling.module");
let TaskSchedulingModuleExample = class TaskSchedulingModuleExample {
};
exports.TaskSchedulingModuleExample = TaskSchedulingModuleExample;
exports.TaskSchedulingModuleExample = TaskSchedulingModuleExample = __decorate([
    (0, common_1.Module)({
        imports: [
            task_scheduling_module_1.TaskSchedulingModule.forRoot({
                queues: ['email', 'file-processing', 'data-sync', 'scheduled-tasks']
            }),
        ],
        controllers: [task_scheduling_controller_1.TaskSchedulingController],
        providers: [
            task_scheduling_service_1.TaskSchedulingService,
            data_sync_processor_example_1.DataSyncProcessor,
            email_processor_example_1.EmailProcessor,
            file_processor_example_1.FileProcessor,
        ],
        exports: [],
    })
], TaskSchedulingModuleExample);
//# sourceMappingURL=task-scheduling-example.module.js.map