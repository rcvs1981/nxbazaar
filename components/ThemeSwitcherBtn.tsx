"use client";
import { useState, useEffect } from "react";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
export function ThemeSwitcherBtn(): React.tsx.Element | null{
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  console.log(theme);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <button
      className="text-lime-700 dark:text-lime-500"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
