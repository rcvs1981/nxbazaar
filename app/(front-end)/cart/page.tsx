"use client";

import Breadcrumb from "@/components/frontend/Breadcrumb";
import CartItems from "@/components/frontend/CartItems";
import CartSubTotalCard from "@/components/frontend/CartSubTotalCard";
import EmptyCart from "@/components/frontend/EmptyCart";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

/* ================= TYPES ================= */

interface CartItem {
  id: string;
  title: string;
  salePrice: number;
  qty: number;
  imageUrl?: string;
  vendorId?: string;
}

/* ================= COMPONENT ================= */

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cart) as CartItem[];

  console.log("cartItems:", cartItems);

  // ✅ keep number (NOT string)
  const subTotal = cartItems.reduce(
  (acc, item) =>
    acc + Number(item.salePrice || 0) * Number(item.qty || 0),
  0
);

  console.log("subTotal:", subTotal);

  return (
    <div>
      <Breadcrumb />

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <CartItems cartItems={cartItems} />

          {/* ✅ pass number */}
          <CartSubTotalCard subTotal={subTotal} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}