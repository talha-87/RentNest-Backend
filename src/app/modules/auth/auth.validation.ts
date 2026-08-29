import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(),
    role: z.enum(["TENANT", "LANDLORD"])
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});