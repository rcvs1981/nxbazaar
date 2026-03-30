"use server";

import { db } from "@/lib/db";
import { marketSchema, MarketInput } from "@/lib/validators/market.schema";
import { Market } from "@/types/market";
import { revalidatePath } from "next/cache";

/* ================================
   CREATE
================================ */
export async function createMarketAction(
  data: unknown
): Promise<Market> {
  const parsed = marketSchema.parse(data);

  const existing = await db.market.findUnique({
    where: { slug: parsed.slug },
  });

  if (existing) {
    throw new Error("Market already exists");
  }

  return db.market.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      logoUrl: parsed.logoUrl ?? null,
      description: parsed.description ?? null,
      isActive: parsed.isActive,
      categories: parsed.categoryIds
        ? {
            connect: parsed.categoryIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: { categories: true },
  });
}

/* ================================
   GET
================================ */
export async function getMarkets(): Promise<Market[]> {
  return db.market.findMany({
    orderBy: { createdAt: "desc" },
    include: { categories: true },
  });
}

/* ================================
   UPDATE
================================ */
export async function updateMarket(
  id: string,
  data: MarketInput
): Promise<Market> {
  const parsed = marketSchema.parse(data);

  return db.market.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      logoUrl: parsed.logoUrl ?? null,
      description: parsed.description ?? null,
      isActive: parsed.isActive,
      categories: parsed.categoryIds
        ? {
            set: parsed.categoryIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: { categories: true },
  });
}

/* ================================
   DELETE
================================ */
export async function deleteMarket(id: string) {
  await db.market.delete({ where: { id } });

  revalidatePath("/dashboard/markets");
}

/* ================================
   BULK DELETE
================================ */
export async function bulkDeleteMarkets(ids: string[]) {
  await db.market.deleteMany({
    where: { id: { in: ids } },
  });

  revalidatePath("/dashboard/markets");

  return {
    success: true,
    message: "Markets deleted successfully",
  };
}

export async function getMarketById(id: string) {
  return await db.market.findUnique({
    where: { id },
    include: { categories: true },
  });
}