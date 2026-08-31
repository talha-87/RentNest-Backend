import { z } from "zod";

export const createRentalSchema = z.object({
  body: z.object({
    propertyId: z.string().min(1),
    moveInDate: z
      .string()
      .datetime()
      .refine(
        (date) => new Date(date) > new Date(),
        "Move-in date must be in the future"
      ),
    message: z.string().max(500).optional(),
  }),
});

export const updateRentalStatusSchema = z.object({
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED"]),
  }),
});