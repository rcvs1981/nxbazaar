import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

/* ---------------- GET SELLER ---------------- */

export async function GET(request: Request, { params }: Params) {
  try {

    const seller = await db.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        sellerProfile: true,
      },
    });

    if (!seller) {
      return NextResponse.json(
        {
          success: false,
          message: "Seller not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: seller,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch seller",
      },
      { status: 500 }
    );
  }
}

/* ---------------- DELETE SELLER ---------------- */

export async function DELETE(request: Request, { params }: Params) {
  try {

    const existingUser = await db.user.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    await db.$transaction([
      db.sellerProfile.deleteMany({
        where: {
          userId: params.id,
        },
      }),

      db.user.delete({
        where: {
          id: params.id,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Seller deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete seller",
      },
      { status: 500 }
    );
  }
}

/* ---------------- UPDATE SELLER ---------------- */

export async function PUT(request: Request, { params }: Params) {
  try {

    const body = await request.json();

    const { status, emailVerified } = body;

    const existingUser = await db.user.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const updatedUser = await db.user.update({
      where: {
        id: params.id,
      },
      data: {
        status,
        emailVerified,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: "Seller updated successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update seller",
      },
      { status: 500 }
    );
  }
}

"use server";



export async function deleteSeller(id: string) {

  await db.$transaction([
    db.sellerProfile.deleteMany({
      where: { userId: id },
    }),
    db.user.delete({
      where: { id },
    }),
  ]);

  return { success: true };
}