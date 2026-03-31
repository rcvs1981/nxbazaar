"use client";

import {
  useApiGet,
  useApiPost,
  useApiDelete,
} from "@/lib/apiRequest";

import {
  CreateOrderPayload,
  Order,
} from "@/types/order";

/* ================================
   GET ALL ORDERS
================================ */

export function useOrders() {
  return useApiGet<Order[]>("/orders", ["orders"]);
}

/* ================================
   GET USER ORDERS
================================ */

export function useUserOrders(userId: string) {
  return useApiGet<Order[]>(
    `/orders/user/${userId}`,
    ["orders", userId]
  );
}

/* ================================
   GET SINGLE ORDER
================================ */

export function useOrder(id: string) {
  return useApiGet<Order>(
    `/orders/${id}`,
    ["order", id]
  );
}

/* ================================
   CREATE ORDER
================================ */

export function useCreateOrder() {
  return useApiPost<Order, CreateOrderPayload>(
    "/orders",
    ["orders"]
  );
}

/* ================================
   DELETE ORDER
================================ */

export function useDeleteOrder() {
  return useApiDelete<Order>("/orders", ["orders"]);
}