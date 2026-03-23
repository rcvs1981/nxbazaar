"use server";

import { Prisma, Category } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/lib/utils/Slug";

interface CategoryFormData {
title: string;
imageUrl?: string;
}

interface ActionResponse<T = null> {
success: boolean;
message: string;
data?: T;
}

/* ==============================
CREATE CATEGORY
============================== */

export async function createCategory(
data: CategoryFormData
): Promise<ActionResponse<Category>> {
const slug = generateSlug(data.title);

try {
const category = await db.category.create({
data: { ...data, slug },
});


revalidatePath("/dashboard/categories");

return {
  success: true,
  message: "Category created successfully ✅",
  data: category,
};


} catch (error) {
if (
error instanceof Prisma.PrismaClientKnownRequestError &&
error.code === "P2002"
) {
return {
success: false,
message: "Category already exists ❌",
};
}


return {
  success: false,
  message: "Failed to create category ❌",
};


}
}

/* ==============================
GET ALL CATEGORIES
============================== */

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      include: {
        products: true,
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

/* ==============================
GET SINGLE CATEGORY
============================== */

export async function getCategory(
slug: string
): Promise<Category | null> {
try {
const category = await db.category.findUnique({
where: { slug },
include: {
products: true,
},
});


return category;


} catch {
return null;
}
}

/* ==============================
UPDATE CATEGORY
============================== */

export async function updateCategory(
id: string,
data: CategoryFormData
): Promise<ActionResponse<Category>> {
const slug = generateSlug(data.title);

try {
const existing = await db.category.findFirst({
where: {
slug,
NOT: { id },
},
});


if (existing) {
  return {
    success: false,
    message: "Another category with this title exists ❌",
  };
}

const category = await db.category.update({
  where: { id },
  data: { ...data, slug },
});

revalidatePath("/dashboard/categories");

return {
  success: true,
  message: "Category updated successfully ✏️",
  data: category,
};


} catch {
return {
success: false,
message: "Failed to update category ❌",
};
}
}

/* ==============================
DELETE CATEGORY
============================== */

export async function deleteCategory(
id: string
): Promise<ActionResponse> {
try {
await db.category.delete({
where: { id },
});


revalidatePath("/dashboard/categories");

return {
  success: true,
  message: "Category deleted successfully 🗑️",
};


} catch {
return {
success: false,
message: "Failed to delete category ❌",
};
}
}
