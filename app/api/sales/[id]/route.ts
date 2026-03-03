import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { saleSchema } from "@/lib/validators/sale.schema";

// ================= GET ONE =================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sale = await db.sale.findUnique({
      where: { id: params.id },
      include: {
        vendor: true,
        product: true,
        order: true,
      },
    });

    if (!sale) {
      return NextResponse.json(
        { message: "Sale not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(sale);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch sale" },
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
    const validatedData = saleSchema.parse(body);

    const updated = await db.sale.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        vendor: true,
        product: true,
        order: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update sale" },
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
    await db.sale.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Sale deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete sale" },
      { status: 500 }
    );
  }
}