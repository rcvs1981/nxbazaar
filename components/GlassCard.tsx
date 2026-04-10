// components/ui/GlassCard.tsx

"use client";

import { motion } from "framer-motion";

export default function GlassCard({ title, value }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl relative overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition" />

      <h3 className="text-sm opacity-70">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </motion.div>
  );
}