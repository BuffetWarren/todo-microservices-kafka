import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import type { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error, value: validatedValue } = this.schema.validate(value);
    
    if (error) {
      const errorMessages = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      throw new BadRequestException({
        message: 'Validation failed',
        errors: errorMessages,
      });
    }
    
    return validatedValue;
  }
}