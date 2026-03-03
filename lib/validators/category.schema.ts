import { z } from "zod";

/**
 * Base Schema (Single Source of Truth)
 */
export const categorySchema = z.object({
   title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  imageUrl: z.string().min(1, "Image is required"),
  description: z.string().min(5, "Description is required"),
  isActive: z.boolean(),
});

/**
 * Type for Form (slug not required)
 */
export type CategoryFormValues = Omit<
  z.infer<typeof categorySchema>,
  "slug"
>;

/**
 * Type for API Payload (slug included)
 */


export type CategoryInput = z.infer<typeof categorySchema>;



/**
 * Form Schema (no slug, isActive optional)
 */
export const categoryFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
 isActive: z.boolean(),
});

/**
 * Types
 */
export type CategoryPayload = z.infer<typeof categorySchema>;
