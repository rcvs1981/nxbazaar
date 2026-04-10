"use client";

import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartCount() {
  // ✅ Always safe selector
  const cartItems = useAppSelector((state) => state.cart || []);

  // ✅ Fix hydration issue
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🚨 Prevent SSR mismatch
  if (!mounted) return null;

  // ✅ Force number
  const count = cartItems.length || 0;

  // ✅ Debug (remove later)
  console.log("CartCount Updated:", cartItems);

  return (
    <Link href="/cart">
      <div className="relative cursor-pointer">
        <ShoppingCart className="w-6 h-6" />

        {/* ✅ Always render span → no hydration issue */}
        <span
          className={`absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full transition-all ${
            count > 0 ? "bg-red-500 scale-100" : "bg-gray-400 scale-75"
          }`}
        >
          {count}
        </span>
      </div>
    </Link>
  );
}