import {db} from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

type Params = {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {

  const order = await db.order.findUnique({
    where: {
      id: params.id,
    },
    include: {
      orderItems: true,
    },
  })

  if (!order) {
    return NextResponse.json(
      { message: "Order not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(order)
}