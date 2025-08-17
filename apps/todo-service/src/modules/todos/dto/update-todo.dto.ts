import { PartialType, OmitType } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(
  OmitType(CreateTodoDto, ['personId'] as const)
) {
  @ApiPropertyOptional({
    description: 'Whether the todo is completed',
    example: true
  })
  @IsOptional()
  @IsBoolean({ message: 'isDone must be a boolean' })
  isDone?: boolean;
}