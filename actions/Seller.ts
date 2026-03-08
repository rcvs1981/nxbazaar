"use server";

import { db } from "@/lib/db";
import { sellerSchema } from "@/lib/validators/seller.schema";
import { UserRole } from "@prisma/client";
export async function createSeller(data: unknown) {

  const sellerData = sellerSchema.parse(data);

  const seller = await db.sellerProfile.create({
    data: sellerData,
  });

  return seller;
}



export async function getSellers() {

  const sellers = await db.user.findMany({
    where: {
      role: UserRole.SELLER,
    },
    include: {
      sellerProfile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return sellers;
}