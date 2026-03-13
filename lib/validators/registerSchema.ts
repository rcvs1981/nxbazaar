import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string(),
  plan: z.string().optional().nullable(),
});

export type RegisterInput = z.infer<typeof registerSchema>;