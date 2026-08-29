import { z } from "zod";

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    location: z.string().min(2, "Location is required"),
    price: z.number().positive("Price must be positive"),
    bedrooms: z.number().int().positive("Bedrooms must be positive"),
    bathrooms: z.number().int().positive("Bathrooms must be positive"),
    area: z.number().positive("Area must be positive"),
    image: z.string().url("Invalid image URL"),
    categoryId: z.string().min(1, "Category ID is required"),
  }),
});

export const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    location: z.string().min(2).optional(),
    price: z.number().positive().optional(),
    bedrooms: z.number().int().positive().optional(),
    bathrooms: z.number().int().positive().optional(),
    area: z.number().positive().optional(),
    image: z.string().url().optional(),
    available: z.boolean().optional(),
    categoryId: z.string().min(1).optional(),
  }),
});