import { z } from "zod"

export const subCategorySchema = z.object({
  title: z.string().min(2, "Title is required"),
  imageUrl: z.string().min(1, "Image is required"),
  description: z.string().min(5, "Description is required"),
  isActive: z.boolean(),
  categoryId: z.string().min(1, "Category is required"),
  hsnCodeId: z.string().optional().or(z.literal("")),
})

export type SubCategoryInput = z.infer<typeof subCategorySchema>
