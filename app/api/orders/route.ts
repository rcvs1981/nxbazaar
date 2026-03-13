import {db} from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {

  try {

    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json(orders)

  } catch {

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    )

  }
}