import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vendorId = searchParams.get("vendorId");

  try {
    const products = await prisma.product.findMany({
      where: vendorId ? { vendorId } : {},
      include: {
        vendor: {
          select: {
            businessName: true,
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      category,
      stock,
      images,
      vendorId,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        stock,
        images,
        vendorId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Product creation failed" },
      { status: 500 }
    );
  }
}