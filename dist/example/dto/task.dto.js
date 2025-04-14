"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayedTaskParamsDto = exports.ScheduledTaskDto = exports.DataSyncJobDto = exports.FileProcessingJobDto = exports.EmailJobDto = exports.EmailAttachmentDto = exports.JobOptionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class JobOptionsDto {
}
exports.JobOptionsDto = JobOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Prioridad del trabajo (valores más altos tienen mayor prioridad)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobOptionsDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Número de intentos en caso de fallo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobOptionsDto.prototype, "attempts", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Si es true, elimina el trabajo después de completarse',
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], JobOptionsDto.prototype, "removeOnComplete", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Si es true, elimina el trabajo después de fallar',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], JobOptionsDto.prototype, "removeOnFail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tiempo de espera entre reintentos en milisegundos',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobOptionsDto.prototype, "backoff", void 0);
class EmailAttachmentDto {
}
exports.EmailAttachmentDto = EmailAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del archivo adjunto' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EmailAttachmentDto.prototype, "filename", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Contenido del archivo (Buffer, Stream)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], EmailAttachmentDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ruta al archivo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailAttachmentDto.prototype, "path", void 0);
class EmailJobDto {
}
exports.EmailJobDto = EmailJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Destinatario(s) del correo',
        example: 'usuario@ejemplo.com',
    }),
    (0, class_validator_1.IsEmail)({}, { each: true }),
    __metadata("design:type", Object)
], EmailJobDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Remitente del correo',
        example: 'noreply@miapp.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], EmailJobDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Asunto del correo',
        example: 'Bienvenido a nuestra plataforma',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EmailJobDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Contenido del correo en texto plano' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailJobDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Contenido del correo en HTML' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailJobDto.prototype, "html", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Archivos adjuntos',
        type: [EmailAttachmentDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EmailAttachmentDto),
    __metadata("design:type", Array)
], EmailJobDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Opciones de configuración del trabajo',
        type: JobOptionsDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => JobOptionsDto),
    __metadata("design:type", JobOptionsDto)
], EmailJobDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Retraso en milisegundos antes de procesar el trabajo',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EmailJobDto.prototype, "delay", void 0);
class FileProcessingJobDto {
}
exports.FileProcessingJobDto = FileProcessingJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ruta del archivo a procesar',
        example: '/uploads/documento.pdf',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileProcessingJobDto.prototype, "filePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de procesamiento a realizar',
        example: 'convert',
        enum: ['parse', 'convert', 'compress', 'analyze'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileProcessingJobDto.prototype, "processType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Opciones adicionales para el procesamiento',
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], FileProcessingJobDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ruta de destino para el archivo procesado',
        example: '/processed/documento.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FileProcessingJobDto.prototype, "outputPath", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Opciones de configuración del trabajo',
        type: JobOptionsDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => JobOptionsDto),
    __metadata("design:type", JobOptionsDto)
], FileProcessingJobDto.prototype, "jobOptions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Retraso en milisegundos antes de procesar el trabajo',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FileProcessingJobDto.prototype, "delay", void 0);
class DataSyncJobDto {
}
exports.DataSyncJobDto = DataSyncJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Origen de los datos', example: 'api_externa' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DataSyncJobDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Destino de los datos',
        example: 'base_de_datos_local',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DataSyncJobDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de datos a sincronizar',
        example: 'usuarios',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DataSyncJobDto.prototype, "dataType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Opciones adicionales para la sincronización',
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DataSyncJobDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Opciones de configuración del trabajo',
        type: JobOptionsDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => JobOptionsDto),
    __metadata("design:type", JobOptionsDto)
], DataSyncJobDto.prototype, "jobOptions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Retraso en milisegundos antes de procesar el trabajo',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DataSyncJobDto.prototype, "delay", void 0);
class ScheduledTaskDto {
}
exports.ScheduledTaskDto = ScheduledTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la tarea', example: 'daily-report' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ScheduledTaskDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Parámetros para la tarea',
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ScheduledTaskDto.prototype, "params", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Opciones de configuración del trabajo',
        type: JobOptionsDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => JobOptionsDto),
    __metadata("design:type", JobOptionsDto)
], ScheduledTaskDto.prototype, "options", void 0);
class DelayedTaskParamsDto {
}
exports.DelayedTaskParamsDto = DelayedTaskParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Retraso en milisegundos', example: 60000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DelayedTaskParamsDto.prototype, "delayMs", void 0);
//# sourceMappingURL=task.dto.js.map