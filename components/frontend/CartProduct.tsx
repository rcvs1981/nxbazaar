"use client";

import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";

/* ================= TYPES ================= */

type CartItem = {
  id: string;
  title: string;
  salePrice: number; // ✅ FIX
  imageUrl?: string; // ✅ FIX
  qty: number;
};

/* ================= COMPONENT ================= */

export default function CartProduct({ cartItem }: { cartItem: CartItem }) {
  const dispatch = useAppDispatch();

  function handleCartItemDelete(cartId: string) {
    dispatch(removeFromCart(cartId));
    toast.success("Item removed Successfully");
  }

  function handleQtyIncrement(cartId: string) {
    dispatch(incrementQty(cartId));
  }

  function handleQtyDecrement(cartId: string) {
    if (cartItem.qty <= 1) return;
    dispatch(decrementQty(cartId));
  }

  // ✅ SAFE calculation
  const price = Number(cartItem.salePrice || 0);
  const qty = Number(cartItem.qty || 0);
  const total = price * qty;

  return (
    <div className="flex items-center justify-between border-b border-slate-300 pb-4 mb-4">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        
        {/* IMAGE */}
        {cartItem.imageUrl ? (
          <Image
            src={cartItem.imageUrl}
            width={80}
            height={80}
            alt={cartItem.title}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs">
            No Image
          </div>
        )}

        <div className="flex flex-col">
          <h2 className="font-medium text-sm line-clamp-2">
            {cartItem.title}
          </h2>
        </div>
      </div>

      {/* CENTER - QTY */}
      <div className="flex items-center border rounded-lg overflow-hidden">
        <button
          onClick={() => handleQtyDecrement(cartItem.id)}
          disabled={qty <= 1}
          className="px-3 py-2 border-r disabled:opacity-40"
        >
          <Minus size={14} />
        </button>

        <p className="px-4 text-sm">{qty}</p>

        <button
          onClick={() => handleQtyIncrement(cartItem.id)}
          className="px-3 py-2 border-l"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col text-right">
          
          {/* ✅ TOTAL */}
          <h4 className="font-semibold text-green-600 text-sm">
            ₹{total.toFixed(2)}
          </h4>

          {/* ✅ UNIT PRICE */}
          <p className="text-xs text-gray-400">
            ₹{price} × {qty}
          </p>
        </div>

        <button
          onClick={() => handleCartItemDelete(cartItem.id)}
          className="hover:scale-110 transition"
        >
          <Trash2 className="text-red-600 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}