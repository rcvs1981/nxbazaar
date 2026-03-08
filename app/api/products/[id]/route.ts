import {db} from "@/lib/db";
import { NextResponse } from "next/server";

interface RouteContext {
  params: {
    id: string;
  };
}

/* ---------------- GET PRODUCT ---------------- */

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

/* ---------------- DELETE PRODUCT ---------------- */

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const product = await db.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}

/* ---------------- UPDATE PRODUCT ---------------- */

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const body = await request.json();

    const product = await db.product.update({
      where: { id: params.id },
      data: {
        barcode: body.barcode,
        categoryId: body.categoryId,
        description: body.description,
        userId: body.farmerId,
        imageUrl: body.imageUrl,
        isActive: body.isActive,
        isWholesale: body.isWholesale,
        productCode: body.productCode,
        productPrice: Number(body.productPrice),
        salePrice: Number(body.salePrice),
        sku: body.sku,
        slug: body.slug,
        tags: body.tags,
        title: body.title,
        unit: body.unit,
        wholesalePrice: Number(body.wholesalePrice),
        wholesaleQty: Number(body.wholesaleQty),
        productStock: Number(body.productStock),
        qty: Number(body.qty),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}