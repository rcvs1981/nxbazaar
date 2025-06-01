// src/app/admin/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

async function getStats() {
  const usersCount = await prisma.user.count();
  const vendorsCount = await prisma.user.count({ where: { role: "vendor" } });
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();

  return { usersCount, vendorsCount, productsCount, ordersCount };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">एडमिन डैशबोर्ड</h1>
      
      {/* ... rest of your tsx remains the same ... */}
    </div>
  );
}