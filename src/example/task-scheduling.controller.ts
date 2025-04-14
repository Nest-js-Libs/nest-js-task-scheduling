import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  DataSyncJobDto,
  EmailJobDto,
  FileProcessingJobDto,
} from './dto/task.dto';
import { TaskSchedulingService } from './services/task-scheduling.service';

@ApiTags('Task Scheduling Bull')
@Controller('tasks')
export class TaskSchedulingController {
  constructor(private readonly taskSchedulingService: TaskSchedulingService) {}

  @Post('email')
  @ApiOperation({ summary: 'Programar un envío de correo electrónico' })
  @ApiQuery({
    name: 'delay',
    required: false,
    description: 'Retraso en milisegundos antes de procesar el trabajo',
  })
  async scheduleEmailTask(
    @Body() data: EmailJobDto,
    @Query('delay') delay?: number,
  ) {
    // Extraer las opciones y el retraso del DTO o de los parámetros de consulta
    const options = {
      ...data.options,
      delay: delay || data.delay,
    };

    const job = await this.taskSchedulingService.addEmailJob(data, options);
    return {
      jobId: job.id,
      status: 'scheduled',
      delay: options.delay,
      removeOnComplete: options.removeOnComplete,
      removeOnFail: options.removeOnFail,
    };
  }

  @Post('file-processing')
  @ApiOperation({ summary: 'Programar un procesamiento de archivo' })
  @ApiQuery({
    name: 'delay',
    required: false,
    description: 'Retraso en milisegundos antes de procesar el trabajo',
  })
  async scheduleFileProcessingTask(
    @Body() data: FileProcessingJobDto,
    @Query('delay') delay?: number,
  ) {
    // Extraer las opciones y el retraso del DTO o de los parámetros de consulta
    const options = {
      ...data.jobOptions,
      delay: delay || data.delay,
    };

    const job = await this.taskSchedulingService.addFileProcessingJob(
      data,
      options,
    );
    return {
      jobId: job.id,
      status: 'scheduled',
      delay: options.delay,
      removeOnComplete: options.removeOnComplete,
      removeOnFail: options.removeOnFail,
    };
  }

  @Post('data-sync')
  @ApiOperation({ summary: 'Programar una sincronización de datos' })
  @ApiQuery({
    name: 'delay',
    required: false,
    description: 'Retraso en milisegundos antes de procesar el trabajo',
  })
  async scheduleDataSyncTask(
    @Body() data: DataSyncJobDto,
    @Query('delay') delay?: number,
  ) {
    // Extraer las opciones y el retraso del DTO o de los parámetros de consulta
    const options = {
      ...data.jobOptions,
      delay: delay || data.delay,
    };

    const job = await this.taskSchedulingService.addDataSyncJob(data, options);
    return {
      jobId: job.id,
      status: 'scheduled',
      delay: options.delay,
      removeOnComplete: options.removeOnComplete,
      removeOnFail: options.removeOnFail,
    };
  }

  @Get(':queue/:jobId')
  @ApiOperation({ summary: 'Obtener información de una tarea programada' })
  @ApiParam({ name: 'queue', description: 'Nombre de la cola' })
  @ApiParam({ name: 'jobId', description: 'ID del trabajo' })
  async getJob(@Param('queue') queue: string, @Param('jobId') jobId: string) {
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

  @Delete(':queue/:jobId')
  @ApiOperation({ summary: 'Eliminar una tarea programada' })
  @ApiParam({ name: 'queue', description: 'Nombre de la cola' })
  @ApiParam({ name: 'jobId', description: 'ID del trabajo' })
  async removeJob(
    @Param('queue') queue: string,
    @Param('jobId') jobId: string,
  ) {
    const removed = await this.taskSchedulingService.removeJob(queue, jobId);
    return { success: removed };
  }
}
