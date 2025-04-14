import { DynamicModule } from '@nestjs/common';
export interface TaskSchedulingModuleOptions {
    queues: string[];
}
export declare class TaskSchedulingModule {
    static forRoot(options: TaskSchedulingModuleOptions): DynamicModule;
}
