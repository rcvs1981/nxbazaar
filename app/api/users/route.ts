import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createUserSchema } from "@/lib/validators/user.schema";
import bcrypt from "bcryptjs";

// ================= CREATE USER =================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = createUserSchema.parse(body);

    const existing = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      validatedData.password,
      10
    );

    const user = await db.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role || "CUSTOMER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}

// ================= GET ALL USERS =================
export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        sellerProfile: true,
        userProfile: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// ================= BULK DELETE =================
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { ids } = body;

    await db.user.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({
      message: "Selected users deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Bulk delete failed" },
      { status: 500 }
    );
  }
}