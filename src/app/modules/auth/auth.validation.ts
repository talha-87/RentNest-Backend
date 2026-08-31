import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(3).max(100),
    email: z.string().trim().email(),
    password: z.string().min(6).max(100),
    phone: z.string().trim().max(20).optional(),
    role: z.enum(["TENANT", "LANDLORD", "ADMIN"]),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().trim().email(),
    password: z.string().min(6).max(100),
  }),
});