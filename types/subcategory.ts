import { Category } from "./category";

export interface SubCategory {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  isActive: boolean;
  categoryId: string;
  category?: Pick<Category, "id" | "title">;
  createdAt: string;
}
import { z } from "zod"

export const subCategorySchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  imageUrl: z.string().min(1, "Image is required"),
  description: z.string().min(5, "Description is required"),
  isActive: z.boolean(),
  categoryId: z.string().min(1, "Category is required"),
})

export type SubCategoryInput = z.infer<typeof subCategorySchema>