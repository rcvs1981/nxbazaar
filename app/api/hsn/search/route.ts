import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q") ?? ""

  const hsnCodes = await db.hsnCode.findMany({
    where: {
      code: {
        contains: query
      }
    },
    take: 10
  })

  return NextResponse.json(hsnCodes)
}