"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="glass px-5 py-5 flex items-center gap-2"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </motion.span>

      {theme === "dark" ? "" : ""}
    </motion.button>
  );
}