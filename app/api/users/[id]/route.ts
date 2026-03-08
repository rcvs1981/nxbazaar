import { NextResponse } from "next/server";
import {db} from "@/lib/db";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().min(1),
});

type RouteContext = {
  params: {
    id: string;
  };
};

// GET USER
export async function GET(
  _req: Request,
  { params }: RouteContext
) {
  try {
    const parsed = paramsSchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user id",
        },
        { status: 400 }
      );
    }

    const { id } = parsed.data;

    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("GET USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}

// DELETE USER
export async function DELETE(
  _req: Request,
  { params }: RouteContext
) {
  try {
    const parsed = paramsSchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user id",
        },
        { status: 400 }
      );
    }

    const { id } = parsed.data;

    const existingUser = await db.user.findUnique({
      where: { id },
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

    const deletedUser = await db.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: deletedUser,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      { status: 500 }
    );
  }
}