import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [PersonsController],
  providers: [PersonsService, PrismaService],
})
export class PersonsModule {}
