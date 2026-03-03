"use server"

import {db} from "@/lib/db"
import { revalidatePath } from "next/cache"
import { subCategorySchema } from "@/lib/validators/subcategory.schema"

export async function createSubCategory(data: unknown) {
  const parsed = subCategorySchema.safeParse(data)

  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }

  const existing = await db.subCategory.findUnique({
    where: { slug: parsed.data.slug },
  })

  if (existing) {
    return { error: { slug: ["Slug already exists"] } }
  }

  await db.subCategory.create({
    data: parsed.data,
  })

  revalidatePath("/dashboard/subcategories")

  return { success: true }
}

export async function updateSubCategory(id: string, data: unknown) {
  const parsed = subCategorySchema.safeParse(data)

  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }

  await db.subCategory.update({
    where: { id },
    data: parsed.data,
  })

  revalidatePath("/dashboard/subcategories")
  return { success: true }
}

export async function deleteSubCategory(id: string) {
  await db.subCategory.delete({
    where: { id },
  })

  revalidatePath("/dashboard/subcategories")
}

export async function deleteMultipleSubCategories(ids: string[]) {
  await db.subCategory.deleteMany({
    where: { id: { in: ids } },
  })

  revalidatePath("/dashboard/subcategories")
}