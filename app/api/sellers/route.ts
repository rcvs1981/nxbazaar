import { auth } from "@/lib/auth";
import {db} from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { storeName, phone } = body;

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const seller = await db.seller.create({
      data: {
        storeName,
        phone,
        userId: user.id,
      },
    });

    return NextResponse.json(seller);

  } catch (error) {
    console.error("SELLER ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create seller" },
      { status: 500 }
    );
  }
}