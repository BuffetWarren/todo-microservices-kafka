import { Test, TestingModule } from '@nestjs/testing';
import { PersonServiceController } from './person-service.controller';
import { PersonServiceService } from './person-service.service';

describe('PersonServiceController', () => {
  let personServiceController: PersonServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersonServiceController],
      providers: [PersonServiceService],
    }).compile();

    personServiceController = app.get<PersonServiceController>(PersonServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(personServiceController.getHello()).toBe('Hello World!');
    });
  });
});
