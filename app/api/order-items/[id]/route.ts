import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orderItemSchema } from "@/lib/validators/orderItem.schema";

// ================= GET ONE =================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.orderItem.findUnique({
      where: { id: params.id },
      include: {
        order: true,
        product: true,
        vendor: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { message: "OrderItem not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch order item" },
      { status: 500 }
    );
  }
}

// ================= UPDATE =================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validatedData = orderItemSchema.parse(body);

    const updated = await db.orderItem.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        order: true,
        product: true,
        vendor: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update order item" },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.orderItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "OrderItem deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete order item" },
      { status: 500 }
    );
  }
}