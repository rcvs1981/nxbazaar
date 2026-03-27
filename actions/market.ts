"use server";

import {db} from "@/lib/db";
import { MarketSchema } from "@/lib/validators/market.schema";
import { cache } from "react";
import { Market } from "@/types/market";

export async function createMarketAction(data: unknown) {
  const parsed = MarketSchema.parse(data);

  const existing = await db.market.findUnique({
    where: { slug: parsed.slug },
  });

  if (existing) {
    throw new Error("Market already exists");
  }

  return await db.market.create({
    data: {
      ...parsed,
      categories: {
        connect: parsed.categoryIds.map((id) => ({ id })),
      },
    },
  });
}



export async function getMarkets(): Promise<Market[]> {
  const markets = await db.market.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categories: true,
    },
  });

  return markets;
}

