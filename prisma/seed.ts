import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter, // ✅ IMPORTANT FIX
});

async function main() {
 await prisma.hsnCode.createMany({
  data: [
    { code: "6101", title: "Men's overcoats, knitted", gstRate: 12 },
    { code: "6103", title: "Men's suits, jackets, trousers (knitted)", gstRate: 12 },
    { code: "6105", title: "Men's shirts (knitted)", gstRate: 12 },
    { code: "6109", title: "T-shirts, singlets and vests", gstRate: 12 },
    { code: "6110", title: "Sweaters, pullovers, sweatshirts", gstRate: 12 },
    { code: "6111", title: "Baby garments and clothing accessories", gstRate: 5 },
    { code: "6115", title: "Socks, stockings and hosiery", gstRate: 12 },

    { code: "6201", title: "Men's overcoats (woven)", gstRate: 12 },
    { code: "6203", title: "Men's suits, jackets, trousers", gstRate: 12 },
    { code: "6205", title: "Men's shirts (woven)", gstRate: 12 },
    { code: "6206", title: "Women's blouses and shirts", gstRate: 12 },
    { code: "6204", title: "Women's dresses, skirts, trousers", gstRate: 12 },
    { code: "6212", title: "Brassieres, girdles and similar articles", gstRate: 12 },
    { code: "6214", title: "Shawls, scarves and mufflers", gstRate: 12 },

    // ✅ FIXED comma
    { code: "6307", title: "Textile flags and banners", gstRate: 12 },
    { code: "6306", title: "Tarpaulins, tents", gstRate: 12 },
    { code: "4911", title: "Printed paper flags", gstRate: 18 },

    { code: "1001", title: "Wheat and meslin", gstRate: 5 },
    { code: "1002", title: "Rye", gstRate: 5 }
  ],
  skipDuplicates: true,
});

  console.log("✅ HSN Codes Seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });