export declare const TASK_PROCESSOR_QUEUE = "task_processor_queue";
export declare const TASK_PROCESS_NAME = "task_process_name";
export declare function TaskProcessor(queue: string): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function TaskProcess(name: string): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
