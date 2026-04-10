"use client";

import { addToCart } from "@/redux/slices/cartSlice";
import { BaggageClaim } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";

/* ================= TYPES ================= */

type Product = {
  id: string;
  title: string;
  salePrice?: number;
  price?: number;
  imageUrl?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

/* ================= COMPONENT ================= */

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>();

  function handleAddToCart() {
    if (!product) return;

    // ✅ minimal cart item (no Date issue)
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.salePrice ?? product.price ?? 0,
      image: product.imageUrl ?? "",
      qty: 1,
    };

    dispatch(addToCart(cartItem));
    toast.success("Item added successfully 🚀");
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 transition px-4 py-2 rounded-md text-white text-sm font-medium"
    >
      <BaggageClaim size={18} />
      <span>Add to Cart</span>
    </button>
  );
}