import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { TaskProcess, TaskProcessor } from 'src/lib/decorators/task-processor.decorators';

@TaskProcessor('file-processing')
export class FileProcessor {
  constructor(private readonly logger: Logger) {}

  /**
   * Procesa trabajos de procesamiento de archivos
   * @param job Trabajo con los datos del archivo a procesar
   */
  @TaskProcess('process-file')
  async handleFileProcessing(job: Job<any>) {
    this.logger.log(`Processing file job ${job.id}`);
    const { filePath, processType } = job.data;

    try {
      // Actualizar progreso - Iniciando
      await job.progress(10);
      this.logger.log(`Starting processing file: ${filePath}`);

      // Simulamos diferentes etapas del procesamiento
      // En un caso real, aquí iría la lógica de procesamiento del archivo
      // como conversión de formatos, análisis de datos, etc.

      // Etapa 1: Lectura del archivo
      await new Promise(resolve => setTimeout(resolve, 500));
      await job.progress(30);
      this.logger.log('File read successfully');

      // Etapa 2: Procesamiento principal
      await new Promise(resolve => setTimeout(resolve, 1000));
      await job.progress(70);
      this.logger.log(`Applied ${processType} processing to file`);

      // Etapa 3: Finalización y guardado
      await new Promise(resolve => setTimeout(resolve, 500));
      await job.progress(100);

      this.logger.log(`File processing completed: ${filePath}`);
      return {
        success: true,
        message: 'File processed successfully',
        outputPath: `processed_${filePath}`,
      };
    } catch (error) {
      this.logger.error(
        `Failed to process file: ${error.message}`,
        error.stack,
      );
      throw error; // Bull reintentará el trabajo según la configuración
    }
  }
}
