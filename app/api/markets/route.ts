import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { marketSchema } from "@/lib/validators/market.schema";

// ================= CREATE =================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = marketSchema.parse(body);

    // Check slug uniqueness
    const existing = await db.market.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 400 }
      );
    }

    // Create Market with category relation
    const market = await db.market.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        logoUrl: validatedData.logoUrl,
        description: validatedData.description,
        isActive: validatedData.isActive,
        categories: validatedData.categories
          ? {
              connect: validatedData.categories.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json(market, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create market" },
      { status: 500 }
    );
  }
}

// ================= GET ALL =================
export async function GET() {
  try {
    const markets = await db.market.findMany({
      include: {
        categories: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(markets);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch markets" },
      { status: 500 }
    );
  }
}

// ================= BULK DELETE =================
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { ids } = body;

    await db.market.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({
      message: "Selected markets deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Bulk delete failed" },
      { status: 500 }
    );
  }
}