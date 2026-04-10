import { z } from "zod";

export const variantAttributeSchema = z.object({
  name: z.string().min(1, "Attribute name required"),
  value: z.string().min(1, "Attribute value required"),
});

export const wholesalePricingSchema = z.object({
  minQty: z.number().min(1),
  price: z.number().min(0),
});

export const productVariantSchema = z
  .object({
    title: z.string().min(1),

    sku: z.string().optional(),
    barcode: z.string().optional(),
    productCode: z.string().optional(),

    unit: z.string().optional(),

    price: z.number().min(0),
    salePrice: z.number().optional(),

    costPrice: z.number().optional(),
    margin: z.number().optional(),

    stock: z.number().optional(),

    image: z.string().optional(),

    isActive: z.boolean().default(true),
    isDefault: z.boolean().default(false),

    attributes: z.array(variantAttributeSchema).optional(),
    wholesalePricing: z.array(wholesalePricingSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.salePrice && data.salePrice > data.price) {
      ctx.addIssue({
        path: ["salePrice"],
        message: "Sale price must be <= price",
        code: z.ZodIssueCode.custom,
      });
    }
  });

  export const baseProductSchema = z.object({
  title: z.string().min(2),

  slug: z.string().optional(),
  description: z.string().optional(),

  imageUrl: z.string().optional(),
  productImages: z.array(z.string()).min(1),

  unit: z.string().optional(),
  tags: z.array(z.string()).default([]),

  isActive: z.boolean().default(true),
  isWholesale: z.boolean().default(false),

  categoryId: z.string(),
  subCategoryId: z.string().optional(),

  userId: z.string(),

  hsnCodeId: z.string().optional(),

  gstRate: z.number().optional(),
  cgst: z.number().optional(),
  sgst: z.number().optional(),
  igst: z.number().optional(),
});


const applyCommonValidation = (schema: z.ZodTypeAny) =>
  schema.superRefine((data: any, ctx) => {
    const hasSplitGST = data.cgst || data.sgst || data.igst;

    if (data.gstRate && hasSplitGST) {
      ctx.addIssue({
        path: ["gstRate"],
        message: "Use either gstRate OR cgst/sgst/igst",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.igst && (data.cgst || data.sgst)) {
      ctx.addIssue({
        path: ["igst"],
        message: "IGST cannot be combined with CGST/SGST",
        code: z.ZodIssueCode.custom,
      });
    }
  });


  export const ProductInputSchema = applyCommonValidation(
  baseProductSchema
    .extend({
      variants: z.array(productVariantSchema).min(1),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug || generateSlug(data.title),
    }))
);

export const productTranslationSchema = z.object({
  productId: z.string(),
  locale: z.enum(["en", "hi", "mr"]),
  title: z.string().min(2),
  description: z.string().optional(),
});

export const createProductSchema = ProductInputSchema;

export const updateProductSchema = ProductInputSchema.partial();
export type ProductInput = z.infer<typeof ProductInputSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;


import { z } from "zod";

export const variantAttributeSchema = z.object({
  name: z.string().min(1, "Attribute name required"),
  value: z.string().min(1, "Attribute value required"),
});

export const wholesalePricingSchema = z.object({
  minQty: z.number().min(1),
  price: z.number().min(0),
});

export const productVariantSchema = z.object({
  productId: z.string(),

  title: z.string().min(1),

  sku: z.string().optional(),
  barcode: z.string().optional(),
  productCode: z.string().optional(),

  unit: z.string().optional(),

  price: z.number().min(0),
  salePrice: z.number().optional(),

  costPrice: z.number().optional(),
  margin: z.number().optional(),

  stock: z.number().optional(),
  lowStockAlert: z.number().optional(),

  image: z.string().optional(),

  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),

  weight: z.number().optional(),
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),

  attributes: z.array(variantAttributeSchema).optional(),
  wholesalePricing: z.array(wholesalePricingSchema).optional(),
});

// lib/validations/product.ts
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  productImages: z.array(z.string()).optional(),

  unit: z.string().optional(),
  tags: z.array(z.string()).optional(),

  isActive: z.boolean().default(true),
  isWholesale: z.boolean().default(false),

  categoryId: z.string(),
  subCategoryId: z.string().optional(),
  userId: z.string(),
  hsnCodeId: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;