import { z } from "zod";

/**
 * ✅ Base schema (common fields)
 */
const baseMarketSchema = z.object({
  title: z.string().min(2),
  logoUrl: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean(),
  categoryIds: z.array(z.string()),
});

/**
 * ✅ Backend schema (slug required)
 */
export const marketSchema = baseMarketSchema.extend({
  slug: z.string(),
});

/**
 * ✅ Form schema (slug optional / removed)
 */
export const marketFormSchema = baseMarketSchema;

/**
 * ✅ Types
 */
export type MarketInput = z.infer<typeof marketSchema>;       // API
export type MarketFormData = z.infer<typeof marketFormSchema>; // Form