import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue, JobOptions } from 'bull';
import { DataSyncJobData, EmailJobData, FileProcessingJobData } from 'src/lib/interfaces/task.interfaces';

@Injectable()
export class TaskSchedulingService {
  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
    @InjectQueue('file-processing') private readonly fileProcessingQueue: Queue,
    @InjectQueue('data-sync') private readonly dataSyncQueue: Queue,
    @InjectQueue('scheduled-tasks') private readonly scheduledTasksQueue: Queue,
    private readonly logger: Logger,
  ) {}

  /**
   * Añade un trabajo a la cola de correos electrónicos
   * @param data Datos necesarios para enviar el correo
   * @param options Opciones adicionales para el trabajo
   */
  async addEmailJob(data: EmailJobData, options?: JobOptions) {
    try {
      // Configurar opciones predeterminadas si no se proporcionan
      const jobOptions: JobOptions = {
        removeOnComplete: true, // Por defecto, eliminar trabajos completados
        removeOnFail: false, // Por defecto, mantener trabajos fallidos
        ...options, // Sobrescribir con opciones proporcionadas
      };

      const job = await this.emailQueue.add('send-email', data, jobOptions);

      if (jobOptions.delay) {
        this.logger.log(
          `Job added to email queue with id: ${job.id}, delay: ${jobOptions.delay}ms`,
        );
      } else {
        this.logger.log(`Job added to email queue with id: ${job.id}`);
      }

      return job;
    } catch (error) {
      this.logger.error(
        `Error adding job to email queue: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Añade un trabajo a la cola de procesamiento de archivos
   * @param data Datos necesarios para procesar el archivo
   * @param options Opciones adicionales para el trabajo
   */
  async addFileProcessingJob(
    data: FileProcessingJobData,
    options?: JobOptions,
  ) {
    try {
      // Configurar opciones predeterminadas si no se proporcionan
      const jobOptions: JobOptions = {
        removeOnComplete: true, // Por defecto, eliminar trabajos completados
        removeOnFail: false, // Por defecto, mantener trabajos fallidos
        ...options, // Sobrescribir con opciones proporcionadas
      };

      const job = await this.fileProcessingQueue.add(
        'process-file',
        data,
        jobOptions,
      );

      if (jobOptions.delay) {
        this.logger.log(
          `Job added to file processing queue with id: ${job.id}, delay: ${jobOptions.delay}ms`,
        );
      } else {
        this.logger.log(
          `Job added to file processing queue with id: ${job.id}`,
        );
      }

      return job;
    } catch (error) {
      this.logger.error(
        `Error adding job to file processing queue: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Añade un trabajo a la cola de sincronización de datos
   * @param data Datos necesarios para la sincronización
   * @param options Opciones adicionales para el trabajo
   */
  async addDataSyncJob(data: DataSyncJobData, options?: JobOptions) {
    try {
      // Configurar opciones predeterminadas si no se proporcionan
      const jobOptions: JobOptions = {
        removeOnComplete: true, // Por defecto, eliminar trabajos completados
        removeOnFail: false, // Por defecto, mantener trabajos fallidos
        ...options, // Sobrescribir con opciones proporcionadas
      };

      const job = await this.dataSyncQueue.add('sync-data', data, jobOptions);

      if (jobOptions.delay) {
        this.logger.log(
          `Job added to data sync queue with id: ${job.id}, delay: ${jobOptions.delay}ms`,
        );
      } else {
        this.logger.log(`Job added to data sync queue with id: ${job.id}`);
      }

      return job;
    } catch (error) {
      this.logger.error(
        `Error adding job to data sync queue: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Obtiene un trabajo por su ID
   * @param queueName Nombre de la cola
   * @param jobId ID del trabajo
   */
  async getJob(queueName: string, jobId: string) {
    try {
      let queue: Queue;
      switch (queueName) {
        case 'email':
          queue = this.emailQueue;
          break;
        case 'file-processing':
          queue = this.fileProcessingQueue;
          break;
        case 'data-sync':
          queue = this.dataSyncQueue;
          break;
        case 'scheduled-tasks':
          queue = this.scheduledTasksQueue;
          break;
        default:
          throw new Error(`Queue ${queueName} not found`);
      }

      return await queue.getJob(jobId);
    } catch (error) {
      this.logger.error(`Error getting job: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Elimina un trabajo por su ID
   * @param queueName Nombre de la cola
   * @param jobId ID del trabajo
   */
  async removeJob(queueName: string, jobId: string) {
    try {
      const job = await this.getJob(queueName, jobId);
      if (job) {
        await job.remove();
        this.logger.log(`Job ${jobId} removed from ${queueName} queue`);
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(`Error removing job: ${error.message}`, error.stack);
      throw error;
    }
  }
}
