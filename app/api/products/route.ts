import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validators/product.schema";

// ================= CREATE =================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = productSchema.parse(body);

    // Unique checks
    const [slugExists, skuExists] = await Promise.all([
      db.product.findUnique({ where: { slug: validated.slug } }),
      db.product.findUnique({ where: { sku: validated.sku } }),
    ]);

    if (slugExists)
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 400 }
      );

    if (skuExists)
      return NextResponse.json(
        { message: "SKU already exists" },
        { status: 400 }
      );

    // Relation validation
    const [category, subCategory, vendor] = await Promise.all([
      db.category.findUnique({ where: { id: validated.categoryId } }),
      validated.subCategoryId
        ? db.subCategory.findUnique({
            where: { id: validated.subCategoryId },
          })
        : null,
      db.user.findUnique({ where: { id: validated.userId } }),
    ]);

    if (!category || !vendor)
      return NextResponse.json(
        { message: "Invalid relation data" },
        { status: 400 }
      );

    if (validated.subCategoryId && !subCategory)
      return NextResponse.json(
        { message: "Invalid subcategory" },
        { status: 400 }
      );

    const product = await db.product.create({
      data: validated,
      include: {
        category: true,
        subCategory: true,
        user: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

// ================= GET ALL =================
export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        subCategory: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ================= BULK DELETE =================
export async function DELETE(req: Request) {
  try {
    const { ids } = await req.json();

    await db.product.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({
      message: "Selected products deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Bulk delete failed" },
      { status: 500 }
    );
  }
}