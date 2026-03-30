import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  imageUrl: z.string().optional(),
  qty: z.number(),
  salePrice: z.number(),
  vendorId: z.string(),
});

export const checkoutSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  district: z.string(),
  country: z.string(),
  paymentMethod: z.string(),
  shippingCost: z.number(),
  userId: z.string(),
});

export const createOrderSchema = z.object({
  checkoutFormData: checkoutSchema,
  orderItems: z.array(orderItemSchema),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;