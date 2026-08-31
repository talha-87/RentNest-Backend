import { z } from "zod";

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(200),
    description: z.string().trim().min(10).max(5000),
    location: z.string().trim().min(2).max(200),
    price: z.number().positive().finite(),
    bedrooms: z.number().int().positive(),
    bathrooms: z.number().int().positive(),
    area: z.number().positive().finite(),
    image: z.string().url(),
    categoryId: z.string().min(1),
  }),
});

export const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(200).optional(),
    description: z.string().trim().min(10).max(5000).optional(),
    location: z.string().trim().min(2).max(200).optional(),
    price: z.number().positive().finite().optional(),
    bedrooms: z.number().int().positive().optional(),
    bathrooms: z.number().int().positive().optional(),
    area: z.number().positive().finite().optional(),
    image: z.string().url().optional(),
    available: z.boolean().optional(),
    categoryId: z.string().min(1).optional(),
  }),
});