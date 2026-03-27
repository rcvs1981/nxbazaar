import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import { MarketSchema } from "@/lib/validators/market";
import { z } from "zod";

/**
 * CREATE MARKET
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ validate
    const data = MarketSchema.parse(body);

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

    // ✅ create with relation fix
    const newMarket = await db.market.create({
      data: {
        title: data.title,
        slug: data.slug,
        logoUrl: data.logoUrl,
        description: data.description,
        isActive: data.isActive,

        // 🔥 IMPORTANT (relation fix)
        categories: {
          connect: data.categoryIds.map((id) => ({ id })),
        },
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
    console.log("POST ERROR:", error);

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
      {
        success: false,
        message: "Failed to create Market",
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
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch markets",
      },
      { status: 500 }
    );
  }
}