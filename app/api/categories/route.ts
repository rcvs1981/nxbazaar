import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";
import { categorySchema } from "@/lib/validators/category.schema";
import { generateSlug } from "@/lib/utils/Slug";

// app/api/categories/route.ts



export async function POST(request: Request) {
  try {
    const body = await request.json();

    const category = await db.category.create({
      data: body,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: "desc" },
      include: { products: true },
    });

    return NextResponse.json(categories);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}