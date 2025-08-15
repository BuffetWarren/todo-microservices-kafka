import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, Min, Max, IsIn } from 'class-validator';

export class SearchQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    @IsIn(['id','name', 'email', 'createdAt', 'updatedAt']) // Champs autorisés
    sortBy?: string = 'createdAt';

    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
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

