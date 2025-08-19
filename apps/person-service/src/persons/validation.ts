import Joi from "joi";

export const PersonDtoSchema = Joi.object({

    name: Joi.string().min(3).required().messages({
        'string.min': 'Le nom doit contenir au moins 3 caractères',
        'any.required': 'Le nom est requis'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'L\'email doit être valide',
        'any.required': 'L\'email est requis'
    }),
});

export const UpdatePersonDtoSchema = Joi.object({
    name: Joi.string().min(3).optional(),
    email: Joi.string().email().optional(),
});

export const PersonFilterRequestDtoSchema = Joi.object({
    search: Joi.string().optional(),

    page: Joi.number().integer().min(1).default(1).optional(),

    limit: Joi.number().integer().min(1).max(100).default(10).optional(),

    sortBy: Joi.string().default('createdAt').optional(),

    orderBy: Joi.string().valid('asc', 'desc').default('desc').optional(),

    filters: Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        createdAtStart: Joi.string().optional(),
        createdAtEnd: Joi.string().optional(),
        updatedAtStart: Joi.string().optional(),
        updatedAtEnd: Joi.string().optional(),
    }).default({}).optional(),
});