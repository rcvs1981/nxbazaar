import { PrismaClient } from "@prisma/client"
import hsnData from "../data/hsn.json"

const prisma = new PrismaClient()

async function main() {

  for (const hsn of hsnData) {
    await prisma.hsnCode.create({
      data: {
        code: hsn.code,
        description: hsn.description,
        cgst: hsn.cgst,
        sgst: hsn.sgst,
        igst: hsn.igst
      }
    })
  }

  console.log("HSN Imported")
}

main()