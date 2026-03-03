import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { marketSchema } from "@/lib/validators/market.schema";

// ================= GET ONE =================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const market = await db.market.findUnique({
      where: { id: params.id },
      include: {
        categories: true,
      },
    });

    if (!market) {
      return NextResponse.json(
        { message: "Market not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(market);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch market" },
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
    const validatedData = marketSchema.parse(body);

    const updated = await db.market.update({
      where: { id: params.id },
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        logoUrl: validatedData.logoUrl,
        description: validatedData.description,
        isActive: validatedData.isActive,
        categories: validatedData.categories
          ? {
              set: validatedData.categories.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update market" },
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
    await db.market.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Market deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete market" },
      { status: 500 }
    );
  }
}