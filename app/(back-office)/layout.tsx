"use client";

import Navbar from "@/components/backoffice/Navbar";
import Sidebar from "@/components/backoffice/Sidebar";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen 
bg-orange-200 dark:bg-orange-500 
text-foreground flex">

      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* RIGHT SIDE */}
      <div className="flex-1 lg:ml-64 flex flex-col">

        {/* Navbar */}
        <div className="fixed top-0 right-0 left-0 lg:left-64 z-40
        bg-background/80 backdrop-blur border-b border-border">
          <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>

        {/* MAIN CONTENT */}
        <main className="pt-24 px-6 pb-10 flex-1 space-y-6">
          {children}
        </main>

      </div>
    </div>
  );
}