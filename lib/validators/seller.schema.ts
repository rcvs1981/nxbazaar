import { z } from "zod";

export const sellerBasicSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(10),
  physicalAddress: z.string().min(5),
  contactPerson: z.string().min(2),
  contactPersonPhone: z.string().min(10),
});

export const sellerFarmSchema = z.object({
  landSize: z.number(),
  mainCrop: z.string().min(2),
  products: z.array(z.string()).optional(),
});

export const sellerAdditionalSchema = z.object({
  profileImageUrl: z.string().optional(),
  terms: z.string().optional(),
  notes: z.string().optional(),
});

export const sellerSchema = sellerBasicSchema
  .merge(sellerFarmSchema)
  .merge(sellerAdditionalSchema);

export type SellerInput = z.infer<typeof sellerSchema>;