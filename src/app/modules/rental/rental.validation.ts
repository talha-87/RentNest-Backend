import { z } from "zod";

export const createRentalSchema = z.object({
  body: z.object({
    propertyId: z.string(),
    moveInDate: z.string(),
    message: z.string().optional(),
  }),
});

export const updateRentalStatusSchema = z.object({
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED"]),
  }),
});