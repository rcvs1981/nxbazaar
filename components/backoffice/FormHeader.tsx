"use client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface Props {
  title: string;
}

export default function FormHeader({ title }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between py-6 px-50 bg-white dark:bg-slate-800 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </h2>

      <button
        onClick={() => router.back()}
        className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
      >
        <X />
      </button>
    </div>
  );
}
