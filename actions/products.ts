"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Product } from "@prisma/client";
import { CreateProductInput, ProductRequest } from "@/types/product";

import { productVariantSchema } from "../validators/productVariant.schema";
/* ================= COMMON SELECT ================= */

const hsnSelect = {
  id: true,
  code: true,
  title: true,
  gstRate: true,
};

/* ================= CREATE ================= */

export async function createProduct(
  data: CreateProductInput
): Promise<ProductRequest> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

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
      subCategory: true,
      hsnCode: { select: hsnSelect },
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

      gstRate: data.gstRate,

      category:
        data.categoryId === null
          ? { disconnect: true }
          : data.categoryId
          ? { connect: { id: data.categoryId } }
          : undefined,

      subCategory:
        data.subCategoryId === null
          ? { disconnect: true }
          : data.subCategoryId
          ? { connect: { id: data.subCategoryId } }
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
      subCategory: true,
      hsnCode: { select: hsnSelect },
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

/* ================= GET ALL PRODUCTS ================= */

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
      subCategory: true,
      hsnCode: { select: hsnSelect },
      user: true,
    },
  });
}

/* ================= GET SINGLE PRODUCT ================= */

export async function getProduct(id: string) {
  try {
    return await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        subCategory: true,
        hsnCode: { select: hsnSelect },
        user: true,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

/* ================= GET PRODUCT BY SLUG ================= */

export async function getProductBySlug(slug: string) {
  try {
    return await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
        subCategory: true,
        hsnCode: { select: hsnSelect },
        user: true,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

"use server";

import { db } from "@/lib/db";
import { productTranslationSchema } from "@/lib/validators/productTranslationSchema";

export async function upsertProductTranslation(data: unknown) {
  const parsed = productTranslationSchema.parse(data);

  const existing = await db.productTranslation.findUnique({
    where: {
      productId_locale: {
        productId: parsed.productId,
        locale: parsed.locale,
      },
    },
  });

  if (existing) {
    return await db.productTranslation.update({
      where: { id: existing.id },
      data: {
        title: parsed.title,
        description: parsed.description,
      },
    });
  }

  return await db.productTranslation.create({
    data: parsed,
  });
}

"use server";



export async function createProductVariant(data: unknown) {
  const parsed = productVariantSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten(),
    };
  }

  const variant = await db.productVariant.create({
    data: {
      ...parsed.data,

      attributes: parsed.data.attributes
        ? {
            create: parsed.data.attributes,
          }
        : undefined,

      wholesalePricing: parsed.data.wholesalePricing
        ? {
            create: parsed.data.wholesalePricing,
          }
        : undefined,
    },
    include: {
      attributes: true,
      wholesalePricing: true,
    },
  });

  return {
    success: true,
    data: variant,
  };
}