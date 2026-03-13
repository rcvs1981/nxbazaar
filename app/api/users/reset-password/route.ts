import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

const resetPasswordSchema = z.object({
  id: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, password } = resetPasswordSchema.parse(body);

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

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      data: updatedUser,
      message: "Password updated successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update password",
      },
      { status: 500 }
    );
  }
}