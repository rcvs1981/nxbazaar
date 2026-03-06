import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { ids } = await request.json()

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "No IDs provided" },
        { status: 400 }
      )
    }

    await db.subCategory.deleteMany({
      where: { id: { in: ids } },
    })

    return NextResponse.json({ message: "Deleted successfully" })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete subcategories" },
      { status: 500 }
    )
  }
}
