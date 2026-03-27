
"use server";

import {db} from "@/lib/db";
import { marketSchema } from "@/lib/validators/market";

export async function createMarket(data: unknown) {
  const parsed = marketSchema.parse(data);

  const existing = await db.market.findUnique({
    where: { slug: parsed.slug },
  });

  if (existing) {
    throw new Error("Market already exists");
  }

  await db.market.create({
    data: parsed,
  });

  return { success: true };
}