import { NextResponse } from "next/server"
import {db} from "@/lib/db"

export async function PUT(req:Request,{params}:{params:{id:string}}){

const body = await req.json()

const hsn = await db.hsnCode.update({

where:{id:params.id},
data:body

})

return NextResponse.json(hsn)

}

export async function DELETE(req:Request,{params}:{params:{id:string}}){

await db.hsnCode.delete({

where:{id:params.id}

})

return NextResponse.json({success:true})

}