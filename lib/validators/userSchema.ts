import { z } from "zod";

/* -------- CREATE USER -------- */

export const createUserSchema = z.object({
  name: z.string().min(3, "Name required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be 6 characters"),
  role: z.enum(["USER", "SELLER", "ADMIN"]).default("USER"),
});

/* -------- UPDATE USER -------- */

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["USER", "SELLER", "ADMIN"]).optional(),
});



export const verifyEmailSchema = z.object({
  id: z.string().min(1, "User id required"),
  token: z.string().optional(),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;


export const userSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export type UserType = z.infer<typeof userSchema>;