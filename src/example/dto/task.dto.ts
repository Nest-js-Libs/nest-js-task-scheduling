import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para opciones de trabajo
 */
export class JobOptionsDto {
  @ApiPropertyOptional({
    description:
      'Prioridad del trabajo (valores más altos tienen mayor prioridad)',
  })
  @IsOptional()
  @IsNumber()
  priority?: number;

  @ApiPropertyOptional({ description: 'Número de intentos en caso de fallo' })
  @IsOptional()
  @IsNumber()
  attempts?: number;

  @ApiPropertyOptional({
    description: 'Si es true, elimina el trabajo después de completarse',
    default: true,
  })
  @IsOptional()
  removeOnComplete?: boolean | number;

  @ApiPropertyOptional({
    description: 'Si es true, elimina el trabajo después de fallar',
    default: false,
  })
  @IsOptional()
  removeOnFail?: boolean | number;

  @ApiPropertyOptional({
    description: 'Tiempo de espera entre reintentos en milisegundos',
  })
  @IsOptional()
  @IsNumber()
  backoff?: number;
}

/**
 * DTO para adjuntos de correo electrónico
 */
export class EmailAttachmentDto {
  @ApiProperty({ description: 'Nombre del archivo adjunto' })
  @IsString()
  @IsNotEmpty()
  filename: string;

  @ApiPropertyOptional({
    description: 'Contenido del archivo (Buffer, Stream)',
  })
  @IsOptional()
  content?: any;

  @ApiPropertyOptional({ description: 'Ruta al archivo' })
  @IsOptional()
  @IsString()
  path?: string;
}

/**
 * DTO para trabajos de correo electrónico
 */
export class EmailJobDto {
  @ApiProperty({
    description: 'Destinatario(s) del correo',
    example: 'usuario@ejemplo.com',
  })
  @IsEmail({}, { each: true })
  to: string | string[];

  @ApiPropertyOptional({
    description: 'Remitente del correo',
    example: 'noreply@miapp.com',
  })
  @IsOptional()
  @IsEmail()
  from?: string;

  @ApiProperty({
    description: 'Asunto del correo',
    example: 'Bienvenido a nuestra plataforma',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiPropertyOptional({ description: 'Contenido del correo en texto plano' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ description: 'Contenido del correo en HTML' })
  @IsOptional()
  @IsString()
  html?: string;

  @ApiPropertyOptional({
    description: 'Archivos adjuntos',
    type: [EmailAttachmentDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmailAttachmentDto)
  attachments?: EmailAttachmentDto[];

  @ApiPropertyOptional({
    description: 'Opciones de configuración del trabajo',
    type: JobOptionsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => JobOptionsDto)
  options?: JobOptionsDto;

  @ApiPropertyOptional({
    description: 'Retraso en milisegundos antes de procesar el trabajo',
  })
  @IsOptional()
  @IsNumber()
  delay?: number;
}

/**
 * DTO para trabajos de procesamiento de archivos
 */
export class FileProcessingJobDto {
  @ApiProperty({
    description: 'Ruta del archivo a procesar',
    example: '/uploads/documento.pdf',
  })
  @IsString()
  @IsNotEmpty()
  filePath: string;

  @ApiProperty({
    description: 'Tipo de procesamiento a realizar',
    example: 'convert',
    enum: ['parse', 'convert', 'compress', 'analyze'],
  })
  @IsString()
  @IsNotEmpty()
  processType: 'parse' | 'convert' | 'compress' | 'analyze';

  @ApiPropertyOptional({
    description: 'Opciones adicionales para el procesamiento',
    type: Object,
  })
  @IsOptional()
  @IsObject()
  options?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Ruta de destino para el archivo procesado',
    example: '/processed/documento.jpg',
  })
  @IsOptional()
  @IsString()
  outputPath?: string;

  @ApiPropertyOptional({
    description: 'Opciones de configuración del trabajo',
    type: JobOptionsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => JobOptionsDto)
  jobOptions?: JobOptionsDto;

  @ApiPropertyOptional({
    description: 'Retraso en milisegundos antes de procesar el trabajo',
  })
  @IsOptional()
  @IsNumber()
  delay?: number;
}

/**
 * DTO para trabajos de sincronización de datos
 */
export class DataSyncJobDto {
  @ApiProperty({ description: 'Origen de los datos', example: 'api_externa' })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({
    description: 'Destino de los datos',
    example: 'base_de_datos_local',
  })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({
    description: 'Tipo de datos a sincronizar',
    example: 'usuarios',
  })
  @IsString()
  @IsNotEmpty()
  dataType: string;

  @ApiPropertyOptional({
    description: 'Opciones adicionales para la sincronización',
    type: Object,
  })
  @IsOptional()
  @IsObject()
  options?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Opciones de configuración del trabajo',
    type: JobOptionsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => JobOptionsDto)
  jobOptions?: JobOptionsDto;

  @ApiPropertyOptional({
    description: 'Retraso en milisegundos antes de procesar el trabajo',
  })
  @IsOptional()
  @IsNumber()
  delay?: number;
}

/**
 * DTO para tareas programadas
 */
export class ScheduledTaskDto {
  @ApiProperty({ description: 'Nombre de la tarea', example: 'daily-report' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Parámetros para la tarea',
    type: Object,
  })
  @IsOptional()
  @IsObject()
  params?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Opciones de configuración del trabajo',
    type: JobOptionsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => JobOptionsDto)
  options?: JobOptionsDto;
}

/**
 * DTO para tareas programadas con retraso
 */
export class DelayedTaskParamsDto {
  @ApiProperty({ description: 'Retraso en milisegundos', example: 60000 })
  @IsNumber()
  @IsNotEmpty()
  delayMs: number;
}
