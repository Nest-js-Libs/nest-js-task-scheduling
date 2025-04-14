"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TaskSchedulingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchedulingModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const config_1 = require("@nestjs/config");
let TaskSchedulingModule = TaskSchedulingModule_1 = class TaskSchedulingModule {
    static forRoot(options) {
        const queueProviders = options.queues.map(queueName => ({
            name: queueName
        }));
        return {
            module: TaskSchedulingModule_1,
            imports: [
                config_1.ConfigModule,
                bull_1.BullModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: (configService, logger) => {
                        try {
                            const redisConfig = {
                                host: 'localhost',
                                port: 6379,
                            };
                            logger.log('Successfully connected to Redis for Task Scheduling Module');
                            return { redis: redisConfig };
                        }
                        catch (error) {
                            logger.error('Failed to connect to Redis for Bull queues, falling back to local memory: ' +
                                error.message);
                        }
                    },
                    inject: [config_1.ConfigService, common_1.Logger],
                }),
                bull_1.BullModule.registerQueue(...queueProviders),
            ],
            controllers: [],
            providers: [
                common_1.Logger,
            ],
            exports: [
                bull_1.BullModule,
                common_1.Logger,
            ],
        };
    }
};
exports.TaskSchedulingModule = TaskSchedulingModule;
exports.TaskSchedulingModule = TaskSchedulingModule = TaskSchedulingModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], TaskSchedulingModule);
//# sourceMappingURL=task-scheduling.module.js.map