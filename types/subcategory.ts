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
  hsnCode?: HsnCode | null;
}

export interface HsnCode {
  id: string;
  code: string;
  title: string;
  gstRate: number;
}
