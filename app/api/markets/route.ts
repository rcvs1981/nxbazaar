import { NextResponse } from "next/server";

import { createMarketAction } from "@/actions/market";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const market = await createMarketAction(body);

    return NextResponse.json({
      success: true,
      data: market,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Market creation failed";

    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
