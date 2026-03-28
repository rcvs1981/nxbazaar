"use server";

import {db} from "@/lib/db";
import { marketSchema, MarketInput } from "@/lib/validators/market.schema";
import { Market } from "@/types/market";
import { cache } from "react";

// ✅ CREATE
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

  return await db.market.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      logoUrl: parsed.logoUrl ?? null,
      description: parsed.description ?? null,
      isActive: parsed.isActive,

      // ✅ SAFE relation connect
      categories: parsed.categoryIds
        ? {
            connect: parsed.categoryIds.map((id: string) => ({
              id,
            })),
          }
        : undefined,
    },
    include: {
      categories: true,
    },
  });
}

// ✅ GET
export async function getMarkets(): Promise<Market[]> {
  return await db.market.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categories: true,
    },
  });
}

// ✅ UPDATE (FULL SAFE)
export async function updateMarket(
  id: string,
  data: MarketInput
): Promise<Market> {
  const parsed = marketSchema.parse(data);

  return await db.market.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      logoUrl: parsed.logoUrl ?? null,
      description: parsed.description ?? null,
      isActive: parsed.isActive,

      // ✅ RELATION UPDATE (IMPORTANT 🔥)
      categories: parsed.categoryIds
        ? {
            set: parsed.categoryIds.map((id: string) => ({
              id,
            })),
          }
        : undefined,
    },
    include: {
      categories: true,
    },
  });
}

// ✅ DELETE
export async function deleteMarket(id: string): Promise<void> {
  await db.market.delete({
    where: { id },
  });
}

// ✅ TOGGLE
export async function toggleMarketStatus(
  id: string,
  isActive: boolean
): Promise<Market> {
  return await db.market.update({
    where: { id },
    data: { isActive },
  });
}

