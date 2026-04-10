"use server"

import {db} from "@/lib/db"
import { revalidatePath } from "next/cache"
import { subCategorySchema } from "@/lib/validators/subcategory.schema"
import { generateSlug } from "@/lib/utils/Slug"

import { subCategoryTranslationSchema } from "@/lib/validators/subCategoryTranslationSchema";
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
    include: { 
      category: true ,
       hsnCode: true
    },
  })
  return data
}


export async function getSubCategoryById(id: string) {
  return await db.subCategory.findUnique({
    where: { id },
    include: {
      category: true,
      hsnCode: true,
    },
  });
}

export async function getSubCategoriesByCategory(categoryId: string) {
  return await db.subCategory.findMany({
    where: { categoryId },
    include: {
      hsnCode: true, // ✅ IMPORTANT
    },
  });
}

"use server";



export async function createSubCategoryTranslation(data: unknown) {
  const validated = subCategoryTranslationSchema.parse(data);

  return await prisma.subCategoryTranslation.create({
    data: validated,
  });
}

export async function updateSubCategoryTranslation(
  id: string,
  data: unknown
) {
  const validated = subCategoryTranslationSchema.parse(data);

  return await prisma.subCategoryTranslation.update({
    where: { id },
    data: validated,
  });
}

export async function deleteSubCategoryTranslation(id: string) {
  return await prisma.subCategoryTranslation.delete({
    where: { id },
  });
}

export async function getTranslationsBySubCategory(subCategoryId: string) {
  return await prisma.subCategoryTranslation.findMany({
    where: { subCategoryId },
  });
}
