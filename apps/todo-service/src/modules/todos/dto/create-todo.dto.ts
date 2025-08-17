import { 
  IsString, 
  MinLength, 
  IsEnum, 
  IsArray, 
  IsInt, 
  IsOptional, 
  IsDateString,
  ArrayMaxSize,
  MaxLength
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Priority } from '../enums/priority.enum';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of the todo',
    example: 'Complete project documentation',
    minLength: 3,
    maxLength: 255
  })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(255, { message: 'Title cannot exceed 255 characters' })
  @Transform(({ value }) => value?.trim())
  title: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the todo',
    example: 'Write comprehensive documentation including API endpoints and usage examples'
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(2000, { message: 'Description cannot exceed 2000 characters' })
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiProperty({
    description: 'Priority level of the todo',
    enum: Priority,
    example: Priority.MEDIUM,
    default: Priority.MEDIUM
  })
  @IsEnum(Priority, { message: 'Priority must be LOW, MEDIUM, or HIGH' })
  priority: Priority = Priority.MEDIUM;

  @ApiProperty({
    description: 'Labels associated with the todo',
    example: ['work', 'documentation', 'urgent'],
    type: [String],
    default: []
  })
  @IsArray({ message: 'Labels must be an array' })
  @IsString({ each: true, message: 'Each label must be a string' })
  @ArrayMaxSize(10, { message: 'Cannot have more than 10 labels' })
  @Transform(({ value }) => value?.map((label: string) => label.trim().toLowerCase()))
  labels: string[] = [];

  @ApiProperty({
    description: 'ID of the person assigned to this todo',
    example: 1
  })
  @IsInt({ message: 'Person ID must be an integer' })
  @Type(() => Number)
  personId: number;

  @ApiProperty({
    description: 'Start date of the todo',
    example: '2024-01-15T08:00:00Z'
  })
  @IsDateString({}, { message: 'Start date must be a valid ISO 8601 date string' })
  startDate: string;
}