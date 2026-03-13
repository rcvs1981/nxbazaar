import { z } from "zod"

export const productSchema = z.object({

  // Basic
  title: z.string().min(2, "Title is required"),
  slug: z.string(),

  description: z.string().optional(),

  // Images
  imageUrl: z.string().optional(),
  productImages: z.array(z.string()).default([]),

  // Codes
  sku: z.string().optional(),
  barcode: z.string().optional(),
  productCode: z.string().optional(),

  // Unit
  unit: z.string().optional(),

  // Pricing
  productPrice: z.coerce.number(),
  salePrice: z.coerce.number(),

  wholesalePrice: z.coerce.number().optional(),
  wholesaleQty: z.coerce.number().optional(),

  // Stock
  productStock: z.coerce.number().optional(),
  qty: z.coerce.number().optional(),

  // Tags
  tags: z.array(z.string()).default([]),

  // Status
  isActive: z.boolean().default(true),
  isWholesale: z.boolean().default(false),

  // Relations
  categoryId: z.string(),
  sellerId: z.string(),

  // GST + HSN relation
  hsnCodeId: z.string().optional(),

  // Optional GST override
  gstRate: z.coerce.number().optional(),
  cgst: z.coerce.number().optional(),
  sgst: z.coerce.number().optional(),
  igst: z.coerce.number().optional(),

})


// update schema
export const updateProductSchema = productSchema.partial()

// types
export type ProductInput = z.infer<typeof productSchema>

export type UpdateProductInput = z.infer<typeof updateProductSchema>

export const productsSchema = z.array(productSchema)

export type Product = z.infer<typeof productSchema>