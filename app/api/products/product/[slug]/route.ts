import {db} from "@/lib/db";
import { NextResponse } from "next/server";

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const product = await db.product.findUnique({
      where: {
        slug: params.slug,
      },
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