"use server";

import {db} from "@/lib/db";
import { marketSchema } from "@/schemas/marketSchema";

export async function createMarketAction(data: unknown) {
  const validated = marketSchema.parse(data);

  const market = await db.market.create({
    data: validated,
  });

  return market;
}