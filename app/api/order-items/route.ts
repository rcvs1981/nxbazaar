import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orderItemSchema } from "@/lib/validators/orderItem.schema";

// ================= CREATE =================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = orderItemSchema.parse(body);

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

    const orderItem = await db.orderItem.create({
      data: validatedData,
      include: {
        order: true,
        product: true,
        vendor: true,
      },
    });

    return NextResponse.json(orderItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create order item" },
      { status: 500 }
    );
  }
}

// ================= GET ALL =================
export async function GET() {
  try {
    const items = await db.orderItem.findMany({
      include: {
        order: true,
        product: true,
        vendor: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch order items" },
      { status: 500 }
    );
  }
}

// ================= BULK DELETE =================
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { ids } = body;

    await db.orderItem.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({
      message: "Selected order items deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Bulk delete failed" },
      { status: 500 }
    );
  }
}