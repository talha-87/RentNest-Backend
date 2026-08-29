import { z } from "zod";

export const createRentalSchema = z.object({
  body: z.object({
    propertyId: z.string().min(1, "Property ID is required"),
    moveInDate: z.string().datetime("Invalid move-in date"),
    message: z.string().max(500).optional(),
  }),
});

export const updateRentalStatusSchema = z.object({
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED"]),
  }),
});