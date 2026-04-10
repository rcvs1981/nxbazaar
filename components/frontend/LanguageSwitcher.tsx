"use client";

import { useState } from "react";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("en");

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded ${
          lang === "en" ? "bg-white/20" : "bg-white/10"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => setLang("hi")}
        className={`px-2 py-1 rounded ${
          lang === "hi" ? "bg-white/20" : "bg-white/10"
        }`}
      >
        हिंदी
      </button>
    </div>
  );
}