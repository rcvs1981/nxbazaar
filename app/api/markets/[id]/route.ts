import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { marketSchema } from "@/lib/validators/market.schema";
import { z } from "zod";

// ✅ GET SINGLE MARKET
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ IMPORTANT

    const market = await db.market.findUnique({
      where: { id },
      include: { categories: true },
    });

    if (!market) {
      return NextResponse.json(
        { success: false, message: "Market not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: market,
    });
  } catch (error) {
    console.log("GET SINGLE ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch market" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE MARKET
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> } // 🔥 FIX HERE ALSO
) {
  try {
    const { id } = await context.params; // ✅ IMPORTANT

    const body = await req.json();
    const data = marketSchema.parse(body);

    const existing = await db.market.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Market not found" },
        { status: 404 }
      );
    }

    // 🔥 slug conflict check
    const slugExists = await db.market.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (slugExists) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    const updated = await db.market.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        logoUrl: data.logoUrl,
        description: data.description,
        isActive: data.isActive,
        categories: {
          set: data.categoryIds.map((id) => ({ id })),
        },
      },
      include: { categories: true },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Market updated successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}

// ✅ DELETE MARKET
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // 🔥 FIX HERE ALSO
) {
  try {
    const { id } = await context.params; // ✅ IMPORTANT

    const existingMarket = await db.market.findUnique({
      where: { id },
    });

    if (!existingMarket) {
      return NextResponse.json(
        { success: false, message: "Market not found" },
        { status: 404 }
      );
    }

    await db.market.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Market deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete market" },
      { status: 500 }
    );
  }
}