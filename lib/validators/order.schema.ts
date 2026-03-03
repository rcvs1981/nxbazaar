import { z } from "zod";

export const orderItemInputSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1),
});

export const createOrderSchema = z.object({
  userId: z.string(),

  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),

  streetAddress: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  apartment: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),

  shippingCost: z.number().optional(),

  paymentMethod: z.string(),

  items: z.array(orderItemInputSchema).min(1),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;