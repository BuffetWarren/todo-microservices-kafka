import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class PersonDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @MinLength(3, { message: 'La recherche doit contenir au moins 3 caractères' })
    @IsString()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
}