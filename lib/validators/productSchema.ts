import { z } from "zod";

/* ================= BASE SCHEMA ================= */

const baseProductSchema = z.object({

  // ================= BASIC =================
  title: z.string().trim().min(2, "Title is required"),

  slug: z.string().optional(),

  description: z.string().optional(),

  // ================= IMAGES =================
  imageUrl: z.string().optional(),

  productImages: z.array(z.string())
    .min(1, "At least one product image is required"),

  // ================= CODES =================
  sku: z.string().optional(),

  barcode: z.string().optional(),

  productCode: z.string().optional(),

  // ================= UNIT =================
  unit: z.string().optional(),

  // ================= PRICING =================
  productPrice: z.coerce
    .number()
    .min(1, "Product price must be greater than 0"),

  salePrice: z.coerce.number().optional(),

  wholesalePrice: z.coerce.number().optional(),

  wholesaleQty: z.coerce.number().optional(),

  // ================= STOCK =================
  productStock: z.coerce.number().min(0).optional(),

  qty: z.coerce.number().optional(),

  // ================= TAGS =================
  tags: z.array(z.string().trim().min(1)).default([]),

  // ================= STATUS =================
  isActive: z.boolean().default(true),

  isWholesale: z.boolean().default(false),

  // ================= RELATIONS =================
  categoryId: z.string().min(1, "Category required"),

  sellerId: z.string().optional(), // optional (admin use)

  // ================= TAX =================
  hsnCodeId: z.string().optional(),

  gstRate: z.coerce.number().optional(),

  cgst: z.coerce.number().optional(),

  sgst: z.coerce.number().optional(),

  igst: z.coerce.number().optional(),

});

/* ================= COMMON VALIDATIONS ================= */

function applyCommonValidation(
  schema: typeof baseProductSchema
) {
  return schema.superRefine((data, ctx) => {

    // ✅ SALE PRICE
    if (
      data.salePrice !== undefined &&
      data.productPrice !== undefined &&
      data.salePrice > data.productPrice
    ) {
      ctx.addIssue({
        path: ["salePrice"],
        message: "Sale price must be <= product price",
        code: z.ZodIssueCode.custom,
      });
    }

    // ✅ WHOLESALE
    if (data.isWholesale) {
      if (!data.wholesalePrice) {
        ctx.addIssue({
          path: ["wholesalePrice"],
          message: "Wholesale price required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.wholesaleQty) {
        ctx.addIssue({
          path: ["wholesaleQty"],
          message: "Minimum quantity required",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // ✅ GST RULES
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
}

/* ================= FINAL SCHEMAS ================= */

// 🔥 CREATE
export const productSchema = applyCommonValidation(baseProductSchema);

// 🔥 UPDATE (partial but same rules)
export const updateProductSchema = applyCommonValidation(
  baseProductSchema.partial()
);

/* ================= TYPES ================= */

export type ProductInput = z.infer<typeof productSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const productsSchema = z.array(productSchema);