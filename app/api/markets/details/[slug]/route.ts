import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import { MarketSchema } from "@/lib/validators/market.schema";

type Params = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, { params }: Params) {
  try {
    const market = await db.market.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!market) {
      return NextResponse.json(
        { message: "Market not found" },
        { status: 404 }
      );
    }

    const validated = MarketSchema.parse(market);

    return NextResponse.json(validated);
  } catch (error) {
    console.error("GET MARKET ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch market" },
      { status: 500 }
    );
  }
}