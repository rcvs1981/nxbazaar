import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sellerSchema } from "@/lib/validators/seller.schema"
import { UserRole } from "@prisma/client"

export async function POST(req: Request) {
  try {

    const body = await req.json()
    const sellerData = sellerSchema.parse(body)

    const seller = await db.$transaction(async (tx) => {

      const user = await tx.user.findUnique({
        where: { id: sellerData.userId }
      })

      if (!user) {
        throw new Error("User not found")
      }

      await tx.user.update({
        where: { id: sellerData.userId },
        data: {
          role: UserRole.SELLER,
          emailVerified: true
        }
      })

      const sellerProfile = await tx.sellerProfile.create({
        data: sellerData
      })

      return sellerProfile
    })

    return NextResponse.json(seller)

  } catch (error) {

    console.log("SELLER ERROR:", error)

    return NextResponse.json(
      { message: "Failed to create seller" },
      { status: 500 }
    )
  }
}