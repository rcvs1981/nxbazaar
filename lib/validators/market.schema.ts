import { z } from "zod";

export const marketSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters"),

  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen separated"),

  logoUrl: z.string().url().optional().or(z.literal("")),

  description: z.string().optional(),

  isActive: z.boolean(),

  categories: z
    .array(z.string())
    .optional(), // categoryIds
});

export type MarketInput = z.infer<typeof marketSchema>;