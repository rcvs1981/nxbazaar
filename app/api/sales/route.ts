import {db} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const sales = await db.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Sales fetched successfully",
      data: sales,
    });
  } catch (error) {
    console.error("SALES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch sales",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}