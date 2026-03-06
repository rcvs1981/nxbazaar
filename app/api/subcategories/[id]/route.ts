import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subCategorySchema } from "@/lib/validators/subcategory.schema";
import { generateSlug } from "@/lib/utils/Slug";

// ================= GET ONE =================
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const subCategory = await db.subCategory.findUnique({
      where: { id },
      include: {
        category: true,
        products: true,
      },
    });

    if (!subCategory) {
      return NextResponse.json(
        { message: "SubCategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subCategory);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch subcategory" },
      { status: 500 }
    );
  }
}

// ================= UPDATE =================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = subCategorySchema.parse(body);
    const slug = generateSlug(validatedData.title);

    const existing = await db.subCategory.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 400 }
      );
    }

    const updated = await db.subCategory.update({
      where: { id },
      data: {
        ...validatedData,
        slug,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update subcategory" },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.subCategory.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "SubCategory deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete subcategory" },
      { status: 500 }
    );
  }
}
