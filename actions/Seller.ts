"use server"

import { db } from "@/lib/db"
import { sellerSchema } from "@/lib/validators/seller.schema"
import { UserRole } from "@prisma/client"

/* ---------------- CREATE SELLER ---------------- */

export async function createSeller(data: unknown) {

  const sellerData = sellerSchema.parse(data)

  const seller = await db.$transaction(async (tx) => {

    await tx.user.update({
      where: { id: sellerData.userId },
      data: {
        role: UserRole.SELLER,
        emailVerified: true,
      },
    })

    const profile = await tx.sellerProfile.create({
      data: sellerData,
    })

    return profile
  })

  return seller
}

/* ---------------- GET SELLERS ---------------- */

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
  })

  return sellers
}

/* ---------------- DELETE SELLER ---------------- */

export async function deleteSeller(id: string) {

  await db.$transaction([
    db.sellerProfile.deleteMany({
      where: { userId: id },
    }),
    db.user.delete({
      where: { id },
    }),
  ])

  return { success: true }
}