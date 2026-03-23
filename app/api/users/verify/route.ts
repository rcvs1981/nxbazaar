import { NextRequest, NextResponse } from "next/server";
import { verifyEmailAction } from "@/actions/users/verify-email";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await verifyEmailAction(body);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update user",
      },
      { status: 500 }
    );
  }
}