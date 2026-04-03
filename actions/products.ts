"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Product } from "@prisma/client";
import { CreateProductInput, ProductRequest } from "@/types/product";

/* ================= CREATE ================= */

export async function createProduct(
  data: CreateProductInput
): Promise<ProductRequest> {

  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // slug check
  const exists = await db.product.findUnique({
    where: { slug: data.slug },
  });

  if (exists) throw new Error("Slug already exists");

  return await db.product.create({
    data: {
      ...data,

      imageUrl: data.productImages?.[0] ?? data.imageUrl,

      user: {
        connect: { id: session.user.id },
      },

      category: data.categoryId
        ? { connect: { id: data.categoryId } }
        : undefined,

      hsnCode: data.hsnCodeId
        ? { connect: { id: data.hsnCodeId } }
        : undefined,
    },

    include: {
      category: true,
      hsnCode: true,
      user: true,
    },
  });
}

/* ================= UPDATE ================= */

export async function updateProduct(
  id: string,
  data: Partial<CreateProductInput>
): Promise<ProductRequest> {

  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product || product.userId !== session.user.id) {
    throw new Error("Not allowed");
  }

  return await db.product.update({
    where: { id },

    data: {
      ...data,

      imageUrl:
        data.productImages && data.productImages.length > 0
          ? data.productImages[0]
          : data.imageUrl,

      // ✅ FIXED
      gstRate: data.gstRate,

      category:
        data.categoryId === null
          ? { disconnect: true }
          : data.categoryId
          ? { connect: { id: data.categoryId } }
          : undefined,

      hsnCode:
        data.hsnCodeId === null
          ? { disconnect: true }
          : data.hsnCodeId
          ? { connect: { id: data.hsnCodeId } }
          : undefined,
    },

    include: {
      category: true,
      hsnCode: true,
      user: true,
    },
  });
}

/* ================= DELETE ================= */

export async function deleteProduct(id: string) {

  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product || product.userId !== session.user.id) {
    throw new Error("Not allowed");
  }

  await db.product.delete({ where: { id } });

  return { success: true };
}

export async function getProducts(filters?: {
  userId?: string;
}) {

  return await db.product.findMany({

    where: {
      userId: filters?.userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      category: true,
      hsnCode: true,
      user: true,
    },

  });
}