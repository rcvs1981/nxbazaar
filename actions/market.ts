"use server";

import { db } from "@/lib/db";
import { marketSchema, type MarketFormData } from "@/lib/validators/market.schema";

export async function createMarketAction(data: unknown) {
  const validated: MarketFormData = marketSchema.parse(data);

  const market = await db.market.create({
    data: validated,
  });

  return market;
}
