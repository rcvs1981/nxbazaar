import { z } from "zod";

export const translationSchema = z.object({
  locale: z.enum(["en", "hi", "mr"]), // scalable
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
});

export const categoryTranslationSchema = z.object({
  categoryId: z.string().optional(), // create में optional
  ...translationSchema.shape,
});

export const categorySchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),

  imageUrl: z.string().optional(),
  description: z.string().optional(),

  isActive: z.boolean().default(true),

  translations: z.array(categoryTranslationSchema).optional(),
});

export const categoryFormSchema = categorySchema.omit({
  slug: true,
});

// API Input
export type CategoryInput = z.infer<typeof categorySchema>;

// Form Values
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;