import { NextResponse } from "next/server";
import {db} from "@/lib/db";
import { marketSchema } from "@/lib/validators/market.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validated = marketSchema.parse(body);

    const market = await db.market.create({
      data: validated,
    });

    return NextResponse.json({
      success: true,
      data: market,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Market creation failed" },
      { status: 500 }
    );
  }
}