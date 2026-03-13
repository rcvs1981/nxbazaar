import { PrismaClient } from "@prisma/client"
import hsnData from "../data/hsn.json"

const prisma = new PrismaClient()

async function main() {

  for (const hsn of hsnData) {

    await prisma.hsnCode.upsert({
      where: { hsnCode: hsn.hsnCode },
      update: {},
      create: {
        hsnCode: hsn.hsnCode,
        description: hsn.description,
        cgst: hsn.cgst,
        sgst: hsn.sgst,
        igst: hsn.igst
      }
    })

  }

}

main()