import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
