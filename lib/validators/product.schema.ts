import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2, "Title required"),

  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen separated"),

  imageUrl: z.string().url().optional().or(z.literal("")),
  productImages: z.array(z.string().url()).optional(),

  description: z.string().optional(),

  isActive: z.boolean(),
  isWholesale: z.boolean(),

  sku: z.string().min(3, "SKU required"),

  productQR: z.string().optional(),

  unit: z.string().optional(),

  productPrice: z.number().positive(),
  salePrice: z.number().positive(),

  wholesalePrice: z.number().positive().optional(),
  wholesaleQty: z.number().int().min(1).optional(),

  productStock: z.number().int().min(0).optional(),
  qty: z.number().int().min(0).optional(),

  tags: z.array(z.string()).optional(),

  categoryId: z.string().min(1),
  subCategoryId: z.string().optional(),
  userId: z.string().min(1),
});

export type ProductInput = z.infer<typeof productSchema>;