import { z } from "zod";

export const SellerSchema = z.object({
  code: z.string().optional(),

  contactPerson: z.string().min(2, "Contact person is required"),

  contactPersonPhone: z
    .string()
    .min(10, "Phone must be at least 10 digits"),

  email: z.string().email("Invalid email"),

  name: z.string().min(2, "Name is required"),

  notes: z.string().optional(),

  phone: z.string().min(10, "Phone is required"),

  physicalAddress: z.string().min(5, "Address is required"),

  terms: z.string().optional(),

  isActive: z.boolean().default(true),

  profileImageUrl: z.string().url().optional(),

  products: z.array(z.string()).optional(),

  // 🔥 FIX: string → number transform
  turnover: z
    .string()
    .min(1, "Land size is required")
    .transform((val) => Number(val)),

  mainproduct: z.string().optional(),

  // 🚨 MOST IMPORTANT FIX
  userId: z
    .string()
    .min(1, "User ID is required")
    .uuid("Invalid User ID"),
});

export type SellerInput = z.infer<typeof SellerSchema>;