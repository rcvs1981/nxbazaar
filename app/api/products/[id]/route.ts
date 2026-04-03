import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import { updateProductSchema } from "@/lib/validators/productSchema";
import { ZodError } from "zod";
import { auth } from "@/auth";
import { updateProduct, deleteProduct } from "@/actions/products";
/* ================= GET ================= */

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
      include: {
        hsnCode: true,
        category: true,
        user: true,
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




export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const product = await updateProduct(params.id, body);

    return NextResponse.json(product);
  } catch (error) {
    console.error("UPDATE ERROR ❌", error);

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteProduct(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR ❌", error);

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}