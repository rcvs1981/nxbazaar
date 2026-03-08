import { z } from "zod";

export const marketSchema = z.object({
  title: z.string().min(3, "Title required"),

  slug: z.string().optional(),

  logoUrl: z.string().optional(),

  description: z.string().optional(),

  categoryIds: z.array(z.string()),

  isActive: z.boolean().default(true),
});

export type MarketFormData = z.infer<typeof marketSchema>;