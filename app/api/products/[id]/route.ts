import db from "@/lib/db"
import { NextResponse } from "next/server"
import { updateProductSchema } from "@/lib/validators/productSchema"
import { ZodError } from "zod"



export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {

  try {

    const product = await db.product.findUnique({

      where: { id: params.id },

      include: {
        hsnCode: true
      }

    })

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(product)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    )
  }
}



export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {

  try {

    const product = await db.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json(product)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    )
  }
}



export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {

  try {

    const json = await request.json()

    const body = updateProductSchema.parse(json)

    const product = await db.product.update({

      where: { id: params.id },

      data: {

        barcode: body.barcode,

        categoryId: body.categoryId,

        description: body.description,

        userId: body.sellerId,

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

        imageUrl: body.productImages?.[0] ?? null,

        hsnCodeId: body.hsnCodeId

      }

    })

    return NextResponse.json(product)

  } catch (error) {

    if (error instanceof ZodError) {

      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      )
    }

    console.error(error)

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    )
  }
}