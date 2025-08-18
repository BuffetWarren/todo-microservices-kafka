import { NestFactory } from '@nestjs/core';
import { PersonServiceModule } from './person-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PersonServiceModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
