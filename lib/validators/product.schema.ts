import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3),

  slug: z.string().optional(),

  sku: z.string().optional(),
  barcode: z.string().optional(),

  productPrice: z.coerce.number(),
  salePrice: z.coerce.number().optional(),

  productStock: z.coerce.number(),
  unit: z.string().optional(),

  description: z.string().optional(),

  categoryId: z.string(),
  farmerId: z.string(),

  isActive: z.boolean().default(true),
  isWholesale: z.boolean().default(false),

  wholesalePrice: z.coerce.number().optional(),
  wholesaleQty: z.coerce.number().optional(),

  productImages: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),

  qty: z.number().default(1),
  productCode: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;