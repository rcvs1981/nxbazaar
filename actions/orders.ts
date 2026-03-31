"use server";

import {db} from "@/lib/db";

/* ================================
   GET ALL ORDERS
================================ */

export async function getOrders() {
  return await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { orderItems: true },
  });
}

/* ================================
   GET USER ORDERS
================================ */

export async function getUserOrders(userId: string) {
  return await db.order.findMany({
    where: { userId },
    include: { orderItems: true },
  });
}

/* ================================
   GET SINGLE ORDER
================================ */

export async function getOrderById(id: string) {
  return await db.order.findUnique({
    where: { id },
    include: { orderItems: true },
  });
}

/* ================================
   DELETE ORDER
================================ */

export async function deleteOrder(id: string) {
  return await db.order.delete({
    where: { id },
  });
}