"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const task_scheduling_example_module_1 = require("./example/task-scheduling-example.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(task_scheduling_example_module_1.TaskSchedulingModuleExample);
    const logger = new common_1.Logger('Bootstrap');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Task Scheduling Library')
        .setDescription('API de ejemplo para la librería de programación de tareas')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Aplicación de ejemplo ejecutándose en: http://localhost:${port}`);
    logger.log(`Documentación Swagger disponible en: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map