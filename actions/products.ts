"use server";

import {db} from "@/lib/db";
import { Product } from "@prisma/client";

// ==============================
// GET ALL PRODUCTS
// ==============================
export async function getProducts(): Promise<Product[]> {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });

    return products;
  } catch (error) {
    console.log("GET PRODUCTS ERROR", error);
    return [];
  }
}

// ==============================
// GET SINGLE PRODUCT
// ==============================
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    return product;
  } catch (error) {
    console.log("GET PRODUCT ERROR", error);
    return null;
  }
}

// ==============================
// CREATE PRODUCT
// ==============================
export async function createProduct(data: Partial<Product>) {
  try {
    const product = await db.product.create({
      data,
    });

    return product;
  } catch (error) {
    console.log("CREATE PRODUCT ERROR", error);
    throw new Error("Failed to create product");
  }
}

// ==============================
// UPDATE PRODUCT
// ==============================
export async function updateProduct(
  id: string,
  data: Partial<Product>
) {
  try {
    const product = await db.product.update({
      where: {
        id,
      },
      data,
    });

    return product;
  } catch (error) {
    console.log("UPDATE PRODUCT ERROR", error);
    throw new Error("Failed to update product");
  }
}

// ==============================
// DELETE PRODUCT
// ==============================
export async function deleteProduct(id: string) {
  try {
    const product = await db.product.delete({
      where: {
        id,
      },
    });

    return product;
  } catch (error) {
    console.log("DELETE PRODUCT ERROR", error);
    throw new Error("Failed to delete product");
  }
}