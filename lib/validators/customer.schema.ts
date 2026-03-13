import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),

  streetAddress: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  country: z.string().optional(),

  profileImage: z.string().optional(),
});

export type CustomerInput = z.infer<typeof customerSchema>;