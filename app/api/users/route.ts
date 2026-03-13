import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {db} from "@/lib/db";
import { registerSchema } from "@/lib/validators/registerSchema";
import base64url from "base64url";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validated = registerSchema.parse(body);

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await db.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}