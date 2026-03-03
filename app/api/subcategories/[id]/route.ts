import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subCategorySchema } from "@/lib/validators/subcategory.schema";

// ================= GET ONE =================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const subCategory = await db.subCategory.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validatedData = subCategorySchema.parse(body);

    const updated = await db.subCategory.update({
      where: { id: params.id },
      data: validatedData,
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
  { params }: { params: { id: string } }
) {
  try {
    await db.subCategory.delete({
      where: { id: params.id },
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