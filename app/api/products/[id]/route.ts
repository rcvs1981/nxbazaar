import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import { updateProductSchema } from "@/lib/validators/productSchema";
import { ZodError } from "zod";
import { auth } from "@/auth";
import { updateProduct, deleteProduct } from "@/actions/products";
/* ================= GET ================= */



export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // 👈 FIX
): Promise<Response> {
  try {
    const { id } = await context.params; // 👈 MUST

    console.log("👉 ID:", id); // debug

    if (!id) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({
    
      where: { id },
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
    console.error("🔥 API ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ FIXED

    const body = await req.json();

    const validatedData = updateProductSchema.parse(body);

    console.log("Updating ID:", id); // ✅ debug

    const updatedProduct = await db.product.update({
      where: {
        id, // ✅ अब सही आएगा
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,

        productPrice: validatedData.productPrice,
        salePrice: validatedData.salePrice,

        categoryId: validatedData.categoryId,
        subCategoryId: validatedData.subCategoryId,

        imageUrl: validatedData.imageUrl,
        isActive: validatedData.isActive,
      },
    });

    return Response.json(updatedProduct);
  } catch (error) {
    console.log("UPDATE ERROR ❌", error);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}