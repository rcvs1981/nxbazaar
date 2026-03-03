"use client";

import { AlignJustify } from "lucide-react";
import React from "react";
import Link from "next/link";

import UserAvatar from "./UserAvatar";

interface Props {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export default function Navbar({ setShowSidebar, showSidebar }: Props) {
 

  return (
    <header
      className="fixed top-0 left-0 lg:left-64 right-0 h-20 
      bg-white dark:bg-slate-800 
      border-b border-slate-200 dark:border-slate-700
      flex items-center justify-between px-6 z-50"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-lime-600 dark:text-lime-500 lg:hidden"
        >
          <AlignJustify size={26} />
        </button>

        {/* Logo mobile */}
        <Link href="/dashboard" className="lg:hidden font-bold text-lg">
          Limi
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center">
        <UserAvatar/> 
      </div>
    </header>
  );
}
