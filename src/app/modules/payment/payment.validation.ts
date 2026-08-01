import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    rentalRequestId: z.string(),
  }),
});

export const confirmPaymentSchema = z.object({
  body: z.object({
    paymentId: z.string(),
  }),
});