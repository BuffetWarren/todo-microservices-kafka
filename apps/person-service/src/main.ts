import { NestFactory } from '@nestjs/core';
import { PersonsModule } from './persons/persons.module';

async function bootstrap() {
  const app = await NestFactory.create(PersonsModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
