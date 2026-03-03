import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().optional(),

  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z.enum(["ADMIN", "SELLER", "CUSTOMER"]).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  role: z.enum(["ADMIN", "SELLER", "CUSTOMER"]).optional(),
  password: z.string().min(6).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;