"use server"

import {db} from "@/lib/db"
import { ProductRequest, CreateProductInput } from "@/types/product"

/* CREATE PRODUCT */

export async function createProduct(
  data: CreateProductInput
): Promise<ProductRequest> {

  const existing = await db.product.findUnique({
    where: { slug: data.slug }
  })

  if (existing) {
    throw new Error("Product already exists")
  }

  const product = await db.product.create({
    data: {
      ...data,
      imageUrl: data.productImages?.[0] ?? null
    }
  })

  return product
}

/* GET ALL PRODUCTS */

export async function getProducts(): Promise<Product[]> {

  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      hsnCode: true
    }
  })

  return products
}

/* GET SINGLE PRODUCT */

export async function getProduct(
  id: string
): Promise<ProductRequest| null> {

  const product = await db.product.findUnique({
    where: { id },
    include: {
      hsnCode: true
    }
  })

  return product
}

/* UPDATE PRODUCT */

export async function updateProduct(
  id: string,
  data: Partial<CreateProductInput>
): Promise<ProductRequest> {

  const product = await db.product.update({
    where: { id },
    data: {
      ...data,
      imageUrl: data.productImages?.[0] ?? undefined
    }
  })

  return product
}

/* DELETE PRODUCT */

export async function deleteProduct(
  id: string
): Promise<{ success: boolean }> {

  await db.product.delete({
    where: { id }
  })

  return { success: true }
}