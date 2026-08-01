import { z } from "zod";

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    location: z.string(),
    price: z.number().positive(),
    bedrooms: z.number().int().positive(),
    bathrooms: z.number().int().positive(),
    area: z.number().positive(),
    image: z.string().url(),
    categoryId: z.string(),
  }),
});

export const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    location: z.string().optional(),
    price: z.number().positive().optional(),
    bedrooms: z.number().int().positive().optional(),
    bathrooms: z.number().int().positive().optional(),
    area: z.number().positive().optional(),
    image: z.string().url().optional(),
    available: z.boolean().optional(),
    categoryId: z.string().optional(),
  }),
});