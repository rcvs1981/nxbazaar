import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { marketSchema } from "@/lib/validators/market.schema";
import { z } from "zod";

/**
 * CREATE MARKET
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ validate
    const data = marketSchema.parse(body);

    // ✅ check duplicate slug
    const existingMarket = await db.market.findUnique({
      where: { slug: data.slug },
    });

    if (existingMarket) {
      return NextResponse.json(
        {
          success: false,
          message: `Market (${data.title}) already exists`,
        },
        { status: 409 }
      );
    }

    // ✅ create market
    const newMarket = await db.market.create({
      data: {
        title: data.title,
        slug: data.slug,
        logoUrl: data.logoUrl,
        description: data.description,
        isActive: data.isActive,

        categories: {
          connect: data.categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        categories: true, // 🔥 return relations
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newMarket,
        message: "Market created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST ERROR:", error);

    // 🔥 Zod error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.flatten(), // ✅ better format
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET ALL MARKETS
 */
export async function GET() {
  try {
    const markets = await db.market.findMany({
      orderBy: { createdAt: "desc" },

      include: {
        categories: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: markets,
        message: "Markets fetched successfully", // ✅ consistency
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch markets",
      },
      { status: 500 }
    );
  }
}



export async function DELETE(req: Request) {
  const body = await req.json();
  const ids: string[] = body.ids;

  await db.market.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return Response.json({
    success: true,
    message: "Markets deleted successfully",
  });
}