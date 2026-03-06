"use server"

import {db} from "@/lib/db"
import { revalidatePath } from "next/cache"
import { subCategorySchema } from "@/lib/validators/subcategory.schema"
import { generateSlug } from "@/lib/utils/Slug"

export async function createSubCategory(data: unknown) {
  const parsed = subCategorySchema.safeParse(data)

  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }

  const slug = generateSlug(parsed.data.title)

  const existing = await db.subCategory.findUnique({
    where: { slug },
  })

  if (existing) {
    return { error: { slug: ["Slug already exists"] } }
  }

  await db.subCategory.create({
    data: {
      ...parsed.data,
      slug,
    },
  })

  revalidatePath("/dashboard/subcategories")

  return { success: true }
}

export async function updateSubCategory(id: string, data: unknown) {
  const parsed = subCategorySchema.safeParse(data)

  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }

  const slug = generateSlug(parsed.data.title)

  const existing = await db.subCategory.findFirst({
    where: {
      slug,
      NOT: { id },
    },
  })

  if (existing) {
    return { error: { slug: ["Slug already exists"] } }
  }

  await db.subCategory.update({
    where: { id },
    data: {
      ...parsed.data,
      slug,
    },
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

export async function getSubCategories() {
  const data = await db.subCategory.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  })
  return data
}
