"use client";

import { GlassCard } from "@/GlassCard";
import { MagneticButton } from "@/Cursor";
import Navbar from "@/components/backoffice/Navbar";
import Sidebar from "@/components/backoffice/Sidebar";
import AnimatedBackground from "@/components/AnimatedBackground";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🌈 Background */}
      <div className="app-bg" />
      <AnimatedBackground />

      {/* 🔥 Noise Texture (Ultra Pro Feel) */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] bg-[url('/noise.png')]" />

      <div className="relative z-10 flex min-h-screen">

        {/* 🧊 Sidebar (Animated) */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Sidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </motion.div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col">

          {/* 🧭 Navbar */}
          <div className="
            fixed top-0 left-0 right-0 z-40
            backdrop-blur-xl
            bg-white/5
            border-b border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          ">
            <Navbar
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          </div>

          {/* 📦 MAIN */}
          <main className="
            pt-24 pb-10 px-4 lg:px-8
            pl-20 lg:pl-72   /* responsive sidebar */
            space-y-6
          ">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="
                relative rounded-2xl p-[1px]
                bg-gradient-to-r from-purple-500/30 to-pink-500/30
              "
            >
              {/* Glass Inner */}
              <div className="
                glass rounded-2xl p-5
                backdrop-blur-2xl
                border border-white/10
                hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]
                transition-all duration-300
              ">
                {children}
              </div>
            </motion.div>

          </main>
        </div>
      </div>
    </div>
  );
}