import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["USER", "SELLER", "ADMIN"]),
  plan: z.string().optional()
});

export const resetPasswordSchema = z.object({
  id: z.string(),
  password: z.string().min(6)
});

export const verifyUserSchema = z.object({
  id: z.string(),
  token: z.string()
});

export type RegisterInput = z.infer<typeof registerSchema>;