"use server";

import {db} from "@/lib/db";

export async function getSales() {
  try {
    const sales = await db.sale.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        order: true, // 🔥 useful for customer info
      },
    });

    return sales;
  } catch (error) {
    console.error("GET SALES ERROR:", error);
    return [];
  }
}