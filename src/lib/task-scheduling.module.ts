import { Global, Logger, Module, DynamicModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService, ConfigModule } from '@nestjs/config';

export interface TaskSchedulingModuleOptions {
  queues: string[];
}

@Global()
@Module({})
export class TaskSchedulingModule {
  static forRoot(options: TaskSchedulingModuleOptions): DynamicModule {
    const queueProviders = options.queues.map(queueName => ({
      name: queueName
    }));

    return {
      module: TaskSchedulingModule,
      imports: [
        ConfigModule,
        BullModule.forRootAsync({
          imports: [ConfigModule], // Add this line to make ConfigService available in BullModule
          useFactory: (configService: ConfigService, logger: Logger) => {
            try {
              // Intentar conectar a Redis primero
              const redisConfig = {
                // host: configService.getOrThrow<string>('REDIS_HOST'),
                // port: parseInt(configService.getOrThrow<string>('REDIS_PORT')),
                host: 'localhost',
                port: 6379,
              };

              logger.log('Successfully connected to Redis for Task Scheduling Module');
              return { redis: redisConfig };
            } catch (error: unknown) {
              // Si falla la conexión a Redis, usar memoria local
              logger.error(
                'Failed to connect to Redis for Bull queues, falling back to local memory: ' +
                  (error as Error).message,
              );
            }
          },
          inject: [ConfigService, Logger],
        }),
        // Registrar las colas que se usarán en la aplicación
        BullModule.registerQueue(...queueProviders),
      ],
      controllers: [],
      providers: [
        Logger,
      ],
      exports: [
        BullModule,
        Logger,
      ],
    };
  }
}