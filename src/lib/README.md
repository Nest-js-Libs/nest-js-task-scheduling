# Módulo de Programación de Tareas (Task Scheduling)

Este módulo proporciona una solución robusta para la programación y ejecución de tareas en segundo plano utilizando Bull y Redis, con soporte para fallback a memoria local cuando Redis no está disponible.

## Principales Casos de Usos
- Envío de correos electrónicos en segundo plano
- Procesamiento de archivos en segundo plano
- Sincronización de datos entre sistemas
- Tareas programadas con cron
- Tareas programadas con retraso
- Monitoreo del estado y progreso de las tareas

## Características

- Procesamiento asíncrono de tareas en segundo plano
- Soporte para colas múltiples con diferentes propósitos
- Reintentos automáticos para tareas fallidas
- Programación de tareas recurrentes con patrones cron
- Programación de tareas con retraso
- Monitoreo del estado y progreso de las tareas

## Configuración

### Variables de entorno obligatorias

```
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Instalación

El módulo ya está integrado en el proyecto. Para utilizarlo, simplemente importa el `TaskSchedulingModule` en tu módulo principal con los nombres de las colas que desees utilizar:

```typescript
import { TaskSchedulingModule } from './app/task-scheduling/task-scheduling.module';

@Module({
  imports: [
    TaskSchedulingModule.forRoot({
      queues: ['email', 'file-processing', 'data-sync', 'scheduled-tasks']
    }),
    // otros módulos...
  ],
})
export class AppModule {}
```

## Uso básico

### Programar una tarea

```typescript
import { Injectable } from '@nestjs/common';
import { TaskSchedulingService } from './app/task-scheduling/services/task-scheduling.service';

@Injectable()
export class MyService {
  constructor(private readonly taskSchedulingService: TaskSchedulingService) {}

  async sendWelcomeEmail(user: any) {
    // Programar un envío de correo en segundo plano
    await this.taskSchedulingService.addEmailJob({
      to: user.email,
      subject: 'Bienvenido a nuestra plataforma',
      text: `Hola ${user.name}, gracias por registrarte.`,
      html: `<h1>Bienvenido ${user.name}</h1><p>Gracias por registrarte en nuestra plataforma.</p>`,
    });
  }
}
```

### Crear un procesador de tareas

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { TaskProcess, TaskProcessor } from './app/task-scheduling/decorators/task-processor.decorators';

@TaskProcessor('email')
@Injectable()
export class EmailProcessor {
  constructor(private readonly logger: Logger) {}

  @TaskProcess('send-email')
  async handleSendEmail(job: Job<any>) {
    this.logger.log(`Processing email job ${job.id}`);
    const { to, subject, text, html } = job.data;
    
    // Lógica para enviar el correo electrónico
    // ...
    
    return { success: true };
  }
}
```

## Casos de uso comunes

### 1. Envío de correos electrónicos en segundo plano

El envío de correos electrónicos puede bloquear el hilo principal y ralentizar las respuestas de la API. Al utilizar una cola de tareas, puedes responder inmediatamente al usuario mientras el correo se envía en segundo plano.

```typescript
// Programar el envío
await taskSchedulingService.addEmailJob({
  to: 'usuario@ejemplo.com',
  subject: 'Asunto del correo',
  text: 'Contenido del correo',
});

// Procesador (en otro archivo)
@TaskProcessor('email')
export class EmailProcessor {
  @TaskProcess('send-email')
  async handleSendEmail(job: Job<any>) {
    // Lógica para enviar el correo
  }
}
```

### 2. Procesamiento de archivos

Operaciones como la conversión de formatos, compresión, o análisis de archivos grandes pueden ser costosas en términos de CPU y memoria. Estas tareas son ideales para procesarlas en segundo plano.

```typescript
// Programar el procesamiento
await taskSchedulingService.addFileProcessingJob({
  filePath: '/ruta/al/archivo.csv',
  processType: 'parse',
  options: { delimiter: ',' },
});

// Procesador (en otro archivo)
@TaskProcessor('file-processing')
export class FileProcessor {
  @TaskProcess('process-file')
  async handleFileProcessing(job: Job<any>) {
    // Lógica para procesar el archivo
  }
}
```

### 3. Sincronización de datos

La sincronización de datos entre sistemas puede ser un proceso largo que no debe bloquear las operaciones normales de la aplicación.

```typescript
// Programar la sincronización
await taskSchedulingService.addDataSyncJob({
  source: 'api_externa',
  destination: 'base_de_datos_local',
  dataType: 'usuarios',
});

// Procesador (en otro archivo)
@TaskProcessor('data-sync')
export class DataSyncProcessor {
  @TaskProcess('sync-data')
  async handleDataSync(job: Job<any>) {
    // Lógica para sincronizar datos
  }
}
```

### 4. Tareas programadas con cron

Algunas tareas necesitan ejecutarse periódicamente según un horario específico, como generación de informes, limpieza de datos, o copias de seguridad.

```typescript
// Programar una tarea recurrente (ejecutar todos los días a las 3 AM)
await taskSchedulingService.scheduleTask(
  'daily-report',
  { reportType: 'daily-summary' },
  '0 3 * * *'
);

// Procesador (en otro archivo)
@TaskProcessor('scheduled-tasks')
export class ScheduledTasksProcessor {
  @TaskProcess('daily-report')
  async handleDailyReport(job: Job<any>) {
    // Lógica para generar el informe diario
  }
}
```

## API REST

El módulo proporciona endpoints REST para interactuar con las tareas programadas:

- `POST /tasks/email` - Programar un envío de correo electrónico
- `POST /tasks/file-processing` - Programar un procesamiento de archivo
- `POST /tasks/data-sync` - Programar una sincronización de datos
- `POST /tasks/scheduled?cronPattern=0 3 * * *` - Programar una tarea con un patrón cron
- `POST /tasks/delayed?delayMs=60000` - Programar una tarea con retraso
- `GET /tasks/:queue/:jobId` - Obtener información de una tarea programada
- `DELETE /tasks/:queue/:jobId` - Eliminar una tarea programada

## Consideraciones

- El módulo intentará conectarse a Redis, pero si no está disponible mostrara un error.
- Para entornos de producción, se recomienda siempre utilizar Redis para garantizar la persistencia de las tareas.
- Los trabajos completados se eliminan automáticamente para liberar memoria (configurable).
- Los trabajos fallidos se conservan para su análisis posterior (configurable).

## Configuración de Tiempo para Trabajos

Todos los tipos de trabajos (email, procesamiento de archivos, sincronización de datos, tareas programadas) ahora aceptan parámetros para configurar su comportamiento temporal:

### Parámetros disponibles:

- **delay**: Tiempo en milisegundos antes de que el trabajo se procese.
- **removeOnComplete**: Si es `true` o un número, el trabajo se eliminará después de completarse. Si es un número, indica cuántos trabajos completados mantener.
- **removeOnFail**: Si es `true` o un número, el trabajo se eliminará después de fallar. Si es un número, indica cuántos trabajos fallidos mantener.
- **priority**: Prioridad del trabajo (valores más altos tienen mayor prioridad).
- **attempts**: Número de intentos en caso de fallo.
- **backoff**: Tiempo de espera entre reintentos en milisegundos.

### Ejemplos de uso:

```typescript
// Programar un correo con 5 minutos de retraso
await taskSchedulingService.addEmailJob(emailData, { delay: 300000 });

// Programar una tarea que se ejecute cada día a las 3 AM
await taskSchedulingService.scheduleTask('daily-backup', backupData, { 
  repeat: { cron: '0 3 * * *' },
  removeOnComplete: 5  // Mantener los últimos 5 trabajos completados
});
```