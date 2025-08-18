import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
    MinLength
} from "class-validator";

export class PersonDto {
    @ApiProperty({
        description: 'Nom de la personne',
        example: 'Warren TABA',
    })
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @MinLength(3, { message: 'La recherche doit contenir au moins 3 caractères' })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Adresse email',
        example: 'warren@gmail.com'
    })
    @IsEmail()
    @IsString()
    email: string;
}

export class PersonFilterDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    email?: string;
}

export class PersonFilterRequestDto {
    @IsOptional()
    @IsString()
    search?: string;

    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number = 1;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 10;

    @ApiProperty({ required: false, default: 'createdAt' })
    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';

    @ApiProperty({ required: false, enum: ['asc', 'desc'], default: 'desc' })
    @IsOptional()
    @IsString()
    orderBy?: 'asc' | 'desc' = 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}