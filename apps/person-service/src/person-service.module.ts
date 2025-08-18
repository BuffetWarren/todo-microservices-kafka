import { Module } from '@nestjs/common';
import { PersonServiceController } from './person-service.controller';
import { PersonServiceService } from './person-service.service';
import { PersonsController } from './modules/persons/persons.controller';
import { PersonService } from './modules/persons/persons.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './modules/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [PersonServiceController, PersonsController],
  providers: [PersonServiceService, PersonService, PrismaService],
})
export class PersonServiceModule {}
