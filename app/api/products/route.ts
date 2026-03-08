import {db} from "@/lib/db"
import { NextResponse } from "next/server"
import { CreateProductBody } from "@/types/product"

export async function POST(request: Request) {
  try {
    const body: CreateProductBody = await request.json()

    const {
      barcode,
      qrCode,
      categoryId,
      description,
      farmerId,
      isActive,
      isWholesale,
      productCode,
      productPrice,
      salePrice,
      sku,
      slug,
      tags,
      title,
      unit,
      wholesalePrice,
      wholesaleQty,
      productStock,
      qty,
      productImages,
      gstRate
    } = body

    const existingProduct = await db.product.findUnique({
      where: { slug }
    })

    if (existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: `Product (${title}) already exists`
        },
        { status: 409 }
      )
    }

    const newProduct = await db.product.create({
      data: {
        barcode,
        qrCode,
        categoryId,
        description,
        userId: farmerId,
        productImages,
        imageUrl: productImages?.[0] ?? null,

        isActive,
        isWholesale,

        productCode,
        sku,
        slug,
        tags,
        title,
        unit,

        gstRate,

        productPrice,
        salePrice,
        wholesalePrice,

        wholesaleQty,
        productStock,
        qty
      }
    })

    return NextResponse.json(newProduct)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        message: "Failed to create Product"
      },
      { status: 500 }
    )
  }
}