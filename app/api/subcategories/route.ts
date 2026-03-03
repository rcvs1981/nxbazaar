import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subCategorySchema } from "@/lib/validators/subcategory.schema";

// ================= CREATE =================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = subCategorySchema.parse(body);

    // Check category exists
    const categoryExists = await db.category.findUnique({
      where: { id: validatedData.categoryId },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { message: "Parent category not found" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await db.subCategory.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 400 }
      );
    }

    const subCategory = await db.subCategory.create({
      data: validatedData,
    });

    return NextResponse.json(subCategory, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create subcategory" },
      { status: 500 }
    );
  }
}

// ================= GET ALL =================
export async function GET() {
  try {
    const subCategories = await db.subCategory.findMany({
      include: {
        category: true,
        products: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(subCategories);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}

// ================= BULK DELETE =================
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { ids } = body;

    await db.subCategory.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({
      message: "Selected subcategories deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Bulk delete failed" },
      { status: 500 }
    );
  }
}