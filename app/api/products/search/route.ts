import {db} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // ✅ Params
    const sortBy = searchParams.get("sort") as "asc" | "desc" | null;
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const searchTerm = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? 1);
    const categoryId = searchParams.get("categoryId");

    const pageSize = 3;
    const skip = (page - 1) * pageSize;

    // ✅ WHERE condition (single source of truth)
    const where: any = {};

    // 🔹 Category filter
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // 🔹 Search filter
    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm, mode: "insensitive" } },
        {
          category: {
            title: { contains: searchTerm, mode: "insensitive" },
          },
        },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    // 🔹 Price filter
    if (min || max) {
      where.salePrice = {};

      if (min) where.salePrice.gte = Number(min);
      if (max) where.salePrice.lte = Number(max);
    }

    // ✅ ORDER BY
    let orderBy: any = { createdAt: "desc" };

    if (sortBy) {
      orderBy = { salePrice: sortBy };
    }

    // ✅ Query (single optimized query)
    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        skip,
        take: pageSize,
        orderBy,
        include: {
          category: true,
        },
      }),

      db.product.count({
        where,
      }),
    ]);

    return NextResponse.json({
      products,
      totalCount,
      page,
      pageSize,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}