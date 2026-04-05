import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";

    const hsn = await db.hsnCode.findMany({
      where: search
        ? {
            OR: [
              {
                code: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      select: {
        id: true,
        code: true,
        title: true,     // ✅ include title
        gstRate: true,
      },
      
      orderBy: {
        code: "asc", // ✅ sorted
      },
    });

    return NextResponse.json(hsn, { status: 200 });

  } catch (error) {
    console.error("HSN API Error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}