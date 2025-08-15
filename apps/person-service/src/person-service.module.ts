import { Module } from '@nestjs/common';
import { PersonServiceController } from './person-service.controller';
import { PersonServiceService } from './person-service.service';

@Module({
  imports: [],
  controllers: [PersonServiceController],
  providers: [PersonServiceService],
})
export class PersonServiceModule {}
