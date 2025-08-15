import { Controller, Get } from '@nestjs/common';
import { PersonServiceService } from './person-service.service';

@Controller()
export class PersonServiceController {
  constructor(private readonly personServiceService: PersonServiceService) {}

  @Get()
  getHello(): string {
    return this.personServiceService.getHello();
  }
}
