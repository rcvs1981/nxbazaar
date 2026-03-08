import db from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const searchTerm = searchParams.get("search") ?? "";
    const sortBy = searchParams.get("sort");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const page = Number(searchParams.get("page") ?? 1);

    const pageSize = 10;

    const where: Prisma.ProductWhereInput = {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          category: {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    };

    if (min || max) {
      where.salePrice = {};

      if (min) {
        where.salePrice.gte = Number(min);
      }

      if (max) {
        where.salePrice.lte = Number(max);
      }
    }

    const products = await db.product.findMany({
      where,

      skip: (page - 1) * pageSize,

      take: pageSize,

      orderBy: sortBy
        ? { salePrice: sortBy === "asc" ? "asc" : "desc" }
        : { createdAt: "desc" },

      include: {
        category: true,
      },
    });

    return NextResponse.json(products);
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