import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PaginatedResponse, PersonDto, PersonFilterRequestDto, PersonFiltersDto } from "./types";

@Injectable()
export class PersonsService {
    person: PrismaClient['person'];
    constructor(private prisma: PrismaService) {
        this.person = prisma.person;
    }

    async createPerson(data: PersonDto) {
        const cleanData = {
            name: data.name.trim(),
            email: data.email.trim()
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

    async selectMany(page: number = 1, limit: number = 10): Promise<PaginatedResponse<any>> {

        const validatedLimit = Math.min(Math.max(limit, 1), 100);
        const validatedPage = Math.max(page, 1);
        const skip = (validatedPage - 1) * validatedLimit;

        try {
            const [data, total] = await Promise.all([
                this.person.findMany({
                    skip,
                    take: validatedLimit,
                    orderBy: { createdAt: 'desc', }
                }),
                this.person.count()
            ]);

            const totalPages = Math.ceil(total / validatedLimit);

            return {
                data,
                pagination: {
                    page: validatedPage,
                    limit: validatedLimit,
                    total,
                    totalPages
                }
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch persons');
        }

    }


    async fetchAll(query: PersonFilterRequestDto) {
        const {
            search,
            limit = 10,
            sortBy = 'createdAt',
            orderBy = 'desc'
        } = query;

        const searchCondition = search ? {
            OR: [
                { email: { contains: search.toLowerCase(), mode: 'insensitive' as const } },
                { name: { contains: search.toLowerCase(), mode: 'insensitive' as const } },
            ],
        } : {};

        // Construction de l'ordre de tri
        const orderCondition = {
            [sortBy]: orderBy
        };
        const validatedLimit = Math.min(Math.max(limit, 1), 100);

        const data = await this.person.findMany({
            where: searchCondition,
            orderBy: orderCondition,
            take: validatedLimit
        })

        return data;
    }

    async filter(
        page: number = 1,
        limit: number = 10,
        search?: string,
        filters: PersonFiltersDto = new PersonFiltersDto(),
        sortBy: string = 'createdAt',
        orderBy: 'asc' | 'desc' = 'desc'
    ): Promise<PaginatedResponse<any>> {
        const validatedLimit = Math.min(Math.max(limit, 1), 100);
        const validatedPage = Math.max(page, 1);
        const skip = (validatedPage - 1) * validatedLimit;

         // Construction de la condition WHERE
        const where: Prisma.PersonWhereInput = {};

        // Recherche générale
        if (search) {
            where.OR = [
                { email: { contains: search.toLowerCase(), mode: 'insensitive' } },
                { name: { contains: search.toLowerCase(), mode: 'insensitive' } },
            ];
        }

        if (filters.name) {
            where.name = { contains: filters.name, mode: 'insensitive' };
        }

        if (filters.email) {
            where.email = { contains: filters.email, mode: 'insensitive' };
        }

         if (filters.createdAtStart || filters.createdAtEnd) {
            where.createdAt = {
                gte: filters.createdAtStart ? new Date(filters.createdAtStart) : undefined,
                lte: filters.createdAtEnd ? new Date(filters.createdAtEnd) : undefined,
            };
        }

        if (filters.updatedAtStart || filters.updatedAtEnd) {
            where.updatedAt = {
                gte: filters.updatedAtStart ? new Date(filters.updatedAtStart) : undefined,
                lte: filters.updatedAtEnd ? new Date(filters.updatedAtEnd) : undefined,
            };
        }

        const orderCondition: Prisma.PersonOrderByWithRelationInput = {
            [sortBy]: orderBy
        };

        try {
            const [data, total] = await Promise.all([
                this.person.findMany({
                    where,
                    orderBy: orderCondition,
                    skip,
                    take: validatedLimit,
                }),
                this.person.count({ where })
            ]);

            const totalPages = Math.ceil(total / validatedLimit);

            return {
                data,
                pagination: {
                    page: validatedPage,
                    limit: validatedLimit,
                    total,
                    totalPages
                }
            };
        } catch (error) {
            throw new InternalServerErrorException('Failed to search persons');
        }
    }
}