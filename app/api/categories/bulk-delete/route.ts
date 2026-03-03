import { NextResponse } from "next/server"
import {db} from "@/lib/db"

export async function POST(request: Request) {
  const { ids } = await request.json()

  await db.category.deleteMany({
    where: { id: { in: ids } },
  })

  return NextResponse.json({ message: "Deleted successfully" })
}