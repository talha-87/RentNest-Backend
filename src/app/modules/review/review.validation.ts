import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    propertyId: z.string().min(1, "Property ID is required"),
    rating: z
      .number()
      .int("Rating must be a whole number")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
    comment: z.string().max(500).optional(),
  }),
});