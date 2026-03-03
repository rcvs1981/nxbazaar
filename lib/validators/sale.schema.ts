import { z } from "zod";

export const saleSchema = z.object({
  orderId: z.string().min(1, "Order is required"),
  productId: z.string().min(1, "Product is required"),
  vendorId: z.string().min(1, "Vendor is required"),

  total: z.number().positive("Total must be positive"),

  productTitle: z.string().min(1, "Product title required"),
  productImage: z.string().url("Valid image URL required"),
  productPrice: z.number().positive(),
  productQty: z.number().int().min(1),
});

export type SaleInput = z.infer<typeof saleSchema>;