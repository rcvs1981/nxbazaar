import { NextResponse } from "next/server";
import {db} from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (!params.id) {
      return NextResponse.json(
        { message: "Customer ID missing" },
        { status: 400 }
      );
    }

    const customer = await db.user.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error("UPDATE CUSTOMER ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update customer" },
      { status: 500 }
    );
  }
}