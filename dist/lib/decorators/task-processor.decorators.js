"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASK_PROCESS_NAME = exports.TASK_PROCESSOR_QUEUE = void 0;
exports.TaskProcessor = TaskProcessor;
exports.TaskProcess = TaskProcess;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
exports.TASK_PROCESSOR_QUEUE = 'task_processor_queue';
exports.TASK_PROCESS_NAME = 'task_process_name';
function TaskProcessor(queue) {
    return (0, common_1.applyDecorators)((0, bull_1.Processor)(queue), (0, common_1.SetMetadata)(exports.TASK_PROCESSOR_QUEUE, queue));
}
function TaskProcess(name) {
    return (0, common_1.applyDecorators)((0, bull_1.Process)(name), (0, common_1.SetMetadata)(exports.TASK_PROCESS_NAME, name));
}
//# sourceMappingURL=task-processor.decorators.js.map