import { z } from "zod";

export const couponSchema = z.object({
  title: z.string().min(2, "Title required"),

  couponCode: z
    .string()
    .min(3)
    .regex(/^[A-Z0-9]+$/, "Coupon must be uppercase letters & numbers"),

  expiryDate: z
    .string()
    .refine((date) => new Date(date) > new Date(), {
      message: "Expiry date must be in future",
    }),

  isActive: z.boolean(),

  vendorId: z.string().min(1, "Vendor required"),
});

export type CouponInput = z.infer<typeof couponSchema>;