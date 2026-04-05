import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { productSchema } from "@/lib/validators/productSchema";
import { auth } from "@/auth";

/* ================= HELPER ================= */

async function generateUniqueBarcode() {
  let barcode = "";
  let exists = true;

  while (exists) {
    barcode = Math.floor(
      100000000000 + Math.random() * 900000000000
    ).toString();

    const found = await db.product.findUnique({
      where: { barcode },
    });

    if (!found) exists = false;
  }

  return barcode;
}

/* ================= GET ================= */

export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        subCategory: true, // ✅ FIX
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

/* ================= CREATE ================= */

export async function POST(request: Request): Promise<Response> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const json = await request.json();
    const body = productSchema.parse(json);

    /* ================= SLUG ================= */

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") +
        "-" +
        Date.now();

    /* ================= DUPLICATE SLUG ================= */

    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { message: `Product (${body.title}) already exists` },
        { status: 409 }
      );
    }

    /* ================= BARCODE FIX ================= */

    let barcode = body.barcode;

    if (barcode) {
      const exists = await db.product.findUnique({
        where: { barcode },
      });

      if (exists) {
        return NextResponse.json(
          { message: "Barcode already exists" },
          { status: 409 }
        );
      }
    } else {
      barcode = await generateUniqueBarcode(); // ✅ AUTO GENERATE
    }

    /* ================= CREATE ================= */

    const product = await db.product.create({
      data: {
        title: body.title,
        slug,

        description: body.description ?? null,

        barcode, // ✅ FIXED
        sku: body.sku ?? null,
        productCode: body.productCode ?? null,

        productPrice: body.productPrice,
        salePrice: body.salePrice ?? null,

        wholesalePrice: body.wholesalePrice ?? null,
        wholesaleQty: body.wholesaleQty ?? null,

        productStock: body.productStock ?? null,

        unit: body.unit ?? null,

        tags: body.tags ?? [],

        isActive: body.isActive ?? true,
        isWholesale: body.isWholesale ?? false,

        productImages: body.productImages,
        imageUrl: body.productImages?.[0] ?? null,

        /* ================= RELATIONS ================= */

        user: {
          connect: { id: session.user.id },
        },

        category: body.categoryId
          ? { connect: { id: body.categoryId } }
          : undefined,

        subCategory: body.subCategoryId
          ? { connect: { id: body.subCategoryId } }
          : undefined, // ✅ FIXED

        hsnCode: body.hsnCodeId
          ? { connect: { id: body.hsnCodeId } }
          : undefined,
      },

      include: {
        category: true,
        subCategory: true, // ✅ FIX
        hsnCode: true,
        user: true,
      },
    });

    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error("CREATE PRODUCT ERROR ❌", error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}