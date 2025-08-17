import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PersonDto } from "./dto";
import { PaginatedResponse, SearchQueryDto } from "./dto/search-query.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PersonService {
    person: PrismaClient['person'];
    constructor(private prisma: PrismaService) {
        this.person = prisma.person;
    }

    async createPerson(data: PersonDto) {
        const cleanData = {
            name: data.name?.trim(),
            email: data.email?.trim()
        };
        try {
            return await this.person.create({ data: cleanData });
        } catch (error) {

            if (error.code === 'P2002') {
                throw new BadRequestException('Email already exists');
            }
            throw new InternalServerErrorException('Failed to create person');
        }
    }


    async updatePerson(id: number, data: PersonDto) {

        await this.getPerson(id);

        const cleanData = {
            name: data.name?.trim(),
            email: data.email?.trim()
        };

        try {
            return await this.person.update({
                where: { id },
                data: cleanData
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new BadRequestException('Email already exists');
            }
            throw new InternalServerErrorException('Failed to update person');
        }
    }

    async deletePerson(id: number) {
        await this.getPerson(id);

        try {
            return await this.person.delete({ where: { id } });
        } catch (error) {
            if (error.code === 'P2003') {
                throw new BadRequestException('Cannot delete: referenced by other records');
            }
            throw new InternalServerErrorException('Failed to delete person');
        }
    }


    async getPerson(id: number) {
        const person = await this.person.findUnique({ where: { id } });
        if (!person) {
            throw new NotFoundException(`Person with ID ${id} not found`);
        }
        return person;
    }

    async fetchAll(query: SearchQueryDto) {
        const { search, limit = 10, sortBy = 'createdAt', orderBy = 'desc' } = query;
        const searchCondition = search ? {
            OR: [
                { email: { contains: search, mode: 'insensitive' as const } },
                { name: { contains: search, mode: 'insensitive' as const } },
            ],
        } : {};

        const orderCondition = {
            [sortBy]: orderBy
        };

        const validatedLimit = Math.min(Math.max(limit, 1), 100);

        const [data] = await Promise.all([
            this.person.findMany({
                where: searchCondition,
                orderBy: orderCondition,
                take: validatedLimit,
            }),
        ]);
        return data;
    }


    async searchPaginated(query: SearchQueryDto): Promise<PaginatedResponse<any>> {
        const {
            search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            orderBy = 'desc'
        } = query;

        // Validation supplémentaire côté service
        const validatedLimit = Math.min(Math.max(limit, 1), 100);
        const validatedPage = Math.max(page, 1);
        const skip = (validatedPage - 1) * validatedLimit;


        // Construction de la condition de recherche
        const searchCondition = search ? {
            OR: [
                { email: { contains: search, mode: 'insensitive' as const } },
                { name: { contains: search, mode: 'insensitive' as const } },
            ],
        } : {};

        // Construction de l'ordre de tri
        const orderCondition = {
            [sortBy]: orderBy
        };

        try {
            
        const [data, total] = await Promise.all([
            this.person.findMany({
                where: searchCondition,
                orderBy: orderCondition,
                skip,
                take: validatedLimit,
            }),
            this.person.count({
                where: searchCondition,
            })
        ]);

        const totalPages = Math.ceil(total / validatedLimit);

        return {
            data,
            pagination: {
                page: validatedPage,
                limit: validatedLimit,
                total,
                totalPages
            },
        };
    } catch (error) {
            throw new InternalServerErrorException('Failed to search persons');
        
        }
    }
}