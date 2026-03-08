import { z } from "zod";

export const sellerSchema = z.object({
  code: z.string(),

  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),

  contactPerson: z.string().optional(),
  contactPersonPhone: z.string().optional(),

  physicalAddress: z.string().optional(),
  terms: z.string().optional(),
  notes: z.string().optional(),

  profileImageUrl: z.string().optional(),

  products: z.array(z.string()).default([]),

  landSize: z.coerce.number().optional(),
  mainCrop: z.string().optional(),

  isActive: z.boolean().default(true),

  userId: z.string(),
});

export type SellerInput = z.infer<typeof sellerSchema>;