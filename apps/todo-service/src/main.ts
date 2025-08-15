import { NestFactory } from '@nestjs/core';
import { TodoServiceModule } from './todo-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TodoServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
