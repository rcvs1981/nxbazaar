"use server"

import { Prisma, Category } from "@prisma/client"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { CategoryFormData } from "@/types/category"
import { generateSlug } from "@/lib/utils/Slug"
import { ActionResponse } from "@/types/action-response"

export async function createCategory(
  data: CategoryFormData
): Promise<ActionResponse<Category>> {

  const slug = generateSlug(data.title)

  try {
    const category = await db.category.create({
      data: { ...data, slug },
    })

    revalidatePath("/dashboard/categories")

    return {
      success: true,
      message: "Category created successfully ✅",
      data: category,
    }

  } catch (error: unknown) {

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Category with this title already exists ❌",
      }
    }

    return {
      success: false,
      message: "Failed to create category ❌",
    }
  }
}
// ==============================
// UPDATE CATEGORY
// ==============================
export async function updateCategory(
  id: string,
  data: CategoryFormData
): Promise<ActionResponse<Category>> {

  const slug = generateSlug(data.title)

  const existing = await db.category.findFirst({
    where: {
      slug,
      NOT: { id }
    }
  })

  if (existing) {
    return {
      success: false,
      message: "Another category with this title already exists ❌",
    }
  }

  try {
    const category = await db.category.update({
      where: { id },
      data: { ...data, slug }
    })

    revalidatePath("/dashboard/categories")

    return {
      success: true,
      message: "Category updated successfully ✏️",
      data: category,
    }
  } catch {
    return {
      success: false,
      message: "Failed to update category ❌",
    }
  }
}
// ==============================
// DELETE CATEGORY
// ==============================
export async function deleteCategory(
  id: string
): Promise<ActionResponse> {

  try {
    await db.category.delete({
      where: { id }
    })

    revalidatePath("/dashboard/categories")

    return {
      success: true,
      message: "Category deleted successfully 🗑️",
    }
  } catch {
    return {
      success: false,
      message: "Failed to delete category ❌",
    }
  }
}



/* ==============================
   GET ALL CATEGORIES
============================== */

export async function getCategories(): Promise<Category[]> {
  return await db.category.findMany({
    orderBy: { createdAt: "desc" },
  })
}