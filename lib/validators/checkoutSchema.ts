import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  paymentMethod: z.enum(["COD", "CARD", "UPI"]),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;