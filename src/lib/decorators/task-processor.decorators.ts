import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';

/**
 * Constantes para metadatos
 */
export const TASK_PROCESSOR_QUEUE = 'task_processor_queue';
export const TASK_PROCESS_NAME = 'task_process_name';

/**
 * Decorador para definir un procesador de tareas
 * @param queue Nombre de la cola a procesar
 */
export function TaskProcessor(queue: string) {
  return applyDecorators(
    Processor(queue),
    SetMetadata(TASK_PROCESSOR_QUEUE, queue),
  );
}

/**
 * Decorador para definir un método que procesa un tipo específico de tarea
 * @param name Nombre del tipo de tarea a procesar
 */
export function TaskProcess(name: string) {
  return applyDecorators(Process(name), SetMetadata(TASK_PROCESS_NAME, name));
}
