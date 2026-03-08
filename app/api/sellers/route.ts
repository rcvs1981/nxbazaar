import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { sellerSchema } from "@/lib/validators/seller.schema";
import { UserRole } from "@prisma/client";
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const sellerData = sellerSchema.parse(body);

    const existingUser = await db.user.findUnique({
      where: {
        id: sellerData.userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "No user found",
        },
        { status: 404 }
      );
    }

    const seller = await db.$transaction(async (tx) => {

      await tx.user.update({
        where: { id: sellerData.userId },
        data: {
          emailVerified: true,
        },
      });

      const newSellerProfile = await tx.sellerProfile.create({
        data: {
          ...sellerData,
        },
      });

      return newSellerProfile;
    });

    return NextResponse.json({
      success: true,
      data: seller,
      message: "Seller created successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create seller",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {

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

    return NextResponse.json({
      success: true,
      data: sellers,
    });

  } catch (error) {

    console.error("GET SELLERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch sellers",
        error: String(error)
      },
      { status: 500 }
    );
  }
}