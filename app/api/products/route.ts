import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { productSchema } from "@/lib/validators/productSchema"

export async function POST(request: Request): Promise<Response> {

  try {

    const json = await request.json()

    const body = productSchema.parse(json)

    const existingProduct = await db.product.findUnique({
      where: { slug: body.slug }
    })

    if (existingProduct) {

      return NextResponse.json(
        { message: `Product (${body.title}) already exists` },
        { status: 409 }
      )
    }

    const product = await db.product.create({

      data: {

        barcode: body.barcode,

        categoryId: body.categoryId,

        description: body.description,

        userId: body.sellerId,

        productImages: body.productImages,

        imageUrl: body.productImages?.[0] ?? null,

        isActive: body.isActive ?? true,

        isWholesale: body.isWholesale ?? false,

        productCode: body.productCode,

        productPrice: body.productPrice,

        salePrice: body.salePrice,

        sku: body.sku,

        slug: body.slug,

        tags: body.tags,

        title: body.title,

        unit: body.unit,

        wholesalePrice: body.wholesalePrice ?? null,

        wholesaleQty: body.wholesaleQty ?? null,

        productStock: body.productStock,

        qty: body.qty ?? null,

        hsnCodeId: body.hsnCodeId

      }

    })

    return NextResponse.json(product)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: "Failed to create Product" },
      { status: 500 }
    )
  }
}