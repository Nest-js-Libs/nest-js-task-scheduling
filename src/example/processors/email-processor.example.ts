import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { TaskProcess, TaskProcessor } from 'src/lib/decorators/task-processor.decorators';


@TaskProcessor('email')
export class EmailProcessor {
  constructor(private readonly logger: Logger) {}

  /**
   * Procesa trabajos de envío de correo electrónico
   * @param job Trabajo con los datos del correo a enviar
   */
  @TaskProcess('send-email')
  async handleSendEmail(job: Job<any>) {
    this.logger.log(`Processing email job ${job.id}`);
    const { to, subject } = job.data;

    try {
      // Aquí iría la lógica real de envío de correo
      // Por ejemplo, usando nodemailer u otro servicio de correo
      this.logger.log(`Sending email to ${to} with subject: ${subject}`);

      // Simulamos el envío exitoso
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Actualizar progreso
      await job.progress(100);

      this.logger.log(`Email sent successfully to ${to}`);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`, error.stack);
      throw error; // Bull reintentará el trabajo según la configuración
    }
  }
}
