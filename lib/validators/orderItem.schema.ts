import { z } from "zod";

export const orderItemSchema = z.object({
  orderId: z.string().min(1, "Order is required"),
  productId: z.string().min(1, "Product is required"),
  vendorId: z.string().min(1, "Vendor is required"),

  imageUrl: z.string().url().optional().or(z.literal("")),

  title: z.string().optional(),

  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1"),

  price: z
    .number()
    .positive("Price must be positive"),
});

export type OrderItemInput = z.infer<typeof orderItemSchema>;