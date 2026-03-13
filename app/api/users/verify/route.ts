import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const verifyUserSchema = z.object({
  id: z.string(),
  token: z.string(),
});

export async function PUT(req: Request) {
  try {

    const body = await req.json();

    const { id, token } = verifyUserSchema.parse(body);

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        {
          data: null,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.verificationToken !== token) {
      return NextResponse.json(
        {
          message: "Invalid verification token",
        },
        { status: 400 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationRequestCount:
          (user.verificationRequestCount ?? 0) + 1,
      },
    });

    return NextResponse.json(updatedUser);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update user",
      },
      { status: 500 }
    );

  }
}