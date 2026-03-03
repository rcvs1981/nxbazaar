import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/* =========================
   GET CATEGORY BY ID
========================= */
export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params; // ✅ unwrap

    const category = await db.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);

  } catch (error) {
    console.error("GET CATEGORY ERROR:", error);
    return NextResponse.json(
      { message: "Failed to Fetch Category" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE CATEGORY
========================= */
export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params; // ✅ unwrap

    const existingCategory = await db.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category Not Found" },
        { status: 404 }
      );
    }

    const deletedCategory = await db.category.delete({
      where: { id },
    });

    return NextResponse.json(deletedCategory);

  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);
    return NextResponse.json(
      { message: "Failed to Delete Category" },
      { status: 500 }
    );
  }
}

/* =========================
   UPDATE CATEGORY
========================= */
export async function PUT(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params; // ✅ unwrap

    const { title, slug, imageUrl, description, isActive } =
      await req.json();

    const existingCategory = await db.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category Not Found" },
        { status: 404 }
      );
    }

    const updatedCategory = await db.category.update({
      where: { id },
      data: { title, slug, imageUrl, description, isActive },
    });

    return NextResponse.json(updatedCategory);

  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);
    return NextResponse.json(
      { message: "Failed to Update Category" },
      { status: 500 }
    );
  }
}