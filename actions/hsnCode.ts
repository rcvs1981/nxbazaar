"use server";

import { db } from "@/lib/db";
import { hsnSchema } from "@/lib/validators/hsncode";
export async function getHsnCodes() {
  try {
    const hsnCodes = await db.hsnCode.findMany({
      orderBy: { createdAt: "desc" },
    });

    return hsnCodes;
  } catch (error) {
    console.error("HSN ERROR ❌", error);
    return [];
  }
}





export async function createHsn(data: unknown) {
  const parsed = hsnSchema.parse(data);

  return await db.hsnCode.create({
    data: {
      code: parsed.code,
      title: parsed.title,
      gstRate: parsed.gstRate,
    },
  });
}