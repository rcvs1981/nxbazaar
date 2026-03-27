import { z } from "zod";

export const marketSchema = z.object({
  title: z.string().min(2),
  slug: z.string(),
  logoUrl: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean(),
  categoryIds: z.array(z.string()),
});

export type MarketInput = z.infer<typeof marketSchema>;