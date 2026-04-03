import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { productSchema } from "@/lib/validators/productSchema";
import { auth } from "@/auth";

/* ================= GET ALL PRODUCTS ================= */

export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        hsnCode: true,
        user: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR ❌", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/* ================= CREATE PRODUCT ================= */

export async function POST(request: Request): Promise<Response> {
  try {
    // ✅ AUTH CHECK
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ BODY PARSE + VALIDATION
    const json = await request.json();
    const body = productSchema.parse(json);

    // ✅ SAFE SLUG (fallback)
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") +
        "-" +
        Date.now();

    // ✅ DUPLICATE CHECK
    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { message: `Product (${body.title}) already exists` },
        { status: 409 }
      );
    }

    // ✅ CREATE PRODUCT
    const product = await db.product.create({
      data: {
        title: body.title,
        slug,

        description: body.description,

        barcode: body.barcode,
        sku: body.sku,
        productCode: body.productCode,

        productPrice: body.productPrice,
        salePrice: body.salePrice,

        wholesalePrice: body.wholesalePrice ?? null,
        wholesaleQty: body.wholesaleQty ?? null,

        productStock: body.productStock,
        

        unit: body.unit,

        tags: body.tags ?? [],

        isActive: body.isActive ?? true,
        isWholesale: body.isWholesale ?? false,

        productImages: body.productImages,
        imageUrl: body.productImages?.[0] ?? null,

        // ✅ RELATIONS
        user: {
          connect: { id: session.user.id },
        },

        category: body.categoryId
          ? { connect: { id: body.categoryId } }
          : undefined,

        hsnCode: body.hsnCodeId
          ? { connect: { id: body.hsnCodeId } }
          : undefined,
      },

      include: {
        category: true,
        hsnCode: true,
        user: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR ❌", error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}