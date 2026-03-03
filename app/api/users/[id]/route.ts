import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { updateUserSchema } from "@/lib/validators/user.schema";
import bcrypt from "bcryptjs";

// ================= GET ONE =================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
      include: {
        sellerProfile: true,
        userProfile: true,
        products: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const { password, ...safeUser } = user;

    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// ================= UPDATE =================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validatedData = updateUserSchema.parse(body);

    let updatedData: any = {
      name: validatedData.name,
      role: validatedData.role,
    };

    if (validatedData.password) {
      updatedData.password = await bcrypt.hash(
        validatedData.password,
        10
      );
    }

    const updated = await db.user.update({
      where: { id: params.id },
      data: updatedData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "User deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
}