import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TaskSchedulingModuleExample } from './example/task-scheduling-example.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskSchedulingModuleExample);
  const logger = new Logger('Bootstrap');

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Scheduling Library')
    .setDescription('API de ejemplo para la librería de programación de tareas')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Iniciar servidor
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Aplicación de ejemplo ejecutándose en: http://localhost:${port}`);
  logger.log(`Documentación Swagger disponible en: http://localhost:${port}/api`);
}

bootstrap();