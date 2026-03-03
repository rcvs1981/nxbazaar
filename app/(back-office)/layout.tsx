"use client";

import Navbar from "@/components/backoffice/Navbar";
import Sidebar from "@/components/backoffice/Sidebar";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-slate-100 dark:bg-slate-900">

      {/* Sidebar fixed */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* RIGHT SIDE */}
      <div className="lg:ml-64">

        {/* Navbar fixed */}
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        {/* ⭐ ONLY SCROLL CONTAINER */}
        <main className="pt-24 px-6 pb-10 min-h-screen">
          {children}
        </main>

      </div>
    </div>
  );
}
