import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { couponSchema } from "@/lib/validators/coupon.schema";

// ================= GET ONE =================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const coupon = await db.coupon.findUnique({
      where: { id: params.id },
      include: { vendor: true },
    });

    if (!coupon)
      return NextResponse.json(
        { message: "Coupon not found" },
        { status: 404 }
      );

    return NextResponse.json(coupon);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch coupon" },
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
    const validated = couponSchema.parse(body);

    const updated = await db.coupon.update({
      where: { id: params.id },
      data: {
        ...validated,
        expiryDate: new Date(validated.expiryDate),
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update coupon" },
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
    await db.coupon.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Coupon deleted",
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}