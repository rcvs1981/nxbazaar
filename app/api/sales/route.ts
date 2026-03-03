import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { saleSchema } from "@/lib/validators/sale.schema";

// ================= CREATE =================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = saleSchema.parse(body);

    // Validate relations
    const [order, product, vendor] = await Promise.all([
      db.order.findUnique({ where: { id: validatedData.orderId } }),
      db.product.findUnique({ where: { id: validatedData.productId } }),
      db.user.findUnique({ where: { id: validatedData.vendorId } }),
    ]);

    if (!order || !product || !vendor) {
      return NextResponse.json(
        { message: "Invalid relation data" },
        { status: 400 }
      );
    }

    const sale = await db.sale.create({
      data: validatedData,
      include: {
        order: true,
        product: true,
        vendor: true,
      },
    });

    return NextResponse.json(sale, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create sale" },
      { status: 500 }
    );
  }
}

// ================= GET ALL =================
export async function GET() {
  try {
    const sales = await db.sale.findMany({
      include: {
        vendor: true,
        product: true,
        order: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch sales" },
      { status: 500 }
    );
  }
}

// ================= BULK DELETE =================
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { ids } = body;

    await db.sale.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({
      message: "Selected sales deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Bulk delete failed" },
      { status: 500 }
    );
  }
}