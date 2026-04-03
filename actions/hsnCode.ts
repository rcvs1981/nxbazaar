"use server";

import { db } from "@/lib/db";

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