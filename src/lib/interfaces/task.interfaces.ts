/**
 * Interfaces para el módulo de tareas programadas
 */

/**
 * Opciones para programar un trabajo
 */
export interface JobOptions {
  /**
   * Prioridad del trabajo (valores más altos tienen mayor prioridad)
   */
  priority?: number;

  /**
   * Retraso en milisegundos antes de procesar el trabajo
   */
  delay?: number;

  /**
   * Número de intentos en caso de fallo
   */
  attempts?: number;

  /**
   * Tiempo de espera entre reintentos en milisegundos
   */
  backoff?: number | { type: string; delay: number };

  /**
   * Si es true, elimina el trabajo después de completarse
   */
  removeOnComplete?: boolean | number;

  /**
   * Si es true, elimina el trabajo después de fallar
   */
  removeOnFail?: boolean | number;

  /**
   * Configuración para trabajos recurrentes
   */
  repeat?: {
    /**
     * Patrón cron para la recurrencia
     */
    cron?: string;

    /**
     * Intervalo en milisegundos
     */
    every?: number;

    /**
     * Límite de repeticiones
     */
    limit?: number;
  };
}

/**
 * Datos para un trabajo de correo electrónico
 */
export interface EmailJobData {
  /**
   * Destinatario del correo
   */
  to: string | string[];

  /**
   * Remitente del correo
   */
  from?: string;

  /**
   * Asunto del correo
   */
  subject: string;

  /**
   * Contenido del correo en texto plano
   */
  text?: string;

  /**
   * Contenido del correo en HTML
   */
  html?: string;

  /**
   * Archivos adjuntos
   */
  attachments?: Array<{
    filename: string;
    content?: any;
    path?: string;
  }>;
}

export interface FileProcessingJobData {
  /**
   * Ruta del archivo a procesar
   */
  filePath: string;

  /**
   * Tipo de procesamiento a realizar
   */
  processType: 'parse' | 'convert' | 'compress' | 'analyze';

  /**
   * Opciones adicionales para el procesamiento
   */
  options?: Record<string, any>;

  /**
   * Ruta de destino para el archivo procesado
   */
  outputPath?: string;
}

/**
 * Datos para un trabajo de sincronización de datos
 */
export interface DataSyncJobData {
  /**
   * Origen de los datos
   */
  source: string;

  /**
   * Destino de los datos
   */
  destination: string;

  /**
   * Tipo de datos a sincronizar
   */
  dataType: string;

  /**
   * Opciones adicionales para la sincronización
   */
  options?: Record<string, any>;
}

/**
 * Datos para una tarea programada
 */
export interface ScheduledTaskData {
  /**
   * Nombre de la tarea
   */
  name: string;

  /**
   * Parámetros para la tarea
   */
  params?: Record<string, any>;
}
