"use client";
import { useRef } from "react";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: any) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current!.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => (ref.current!.style.transform = "translate(0,0)")}
      className="
        px-6 py-3 rounded-xl
        bg-gradient-to-r from-orange-300 to-orange-500
        text-white cursor-pointer
        hover:shadow-[0_0_30px_rgba(255,115,0,0.8)]
        transition
      "
    >
      {children}
    </div>
  );
}