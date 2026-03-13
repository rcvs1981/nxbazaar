import { NextResponse } from "next/server"
import {db} from "@/lib/db"

export async function POST(req:Request){

const body = await req.json()

const hsn = await db.hsnCode.create({
data:body
})

return NextResponse.json(hsn)

}

export async function GET(){

const data = await db.hsnCode.findMany({
orderBy:{hsnCode:"asc"}
})

return NextResponse.json(data)

}