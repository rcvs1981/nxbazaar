"use client";

import {
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

/* ================= TYPES ================= */

type Option = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;                // ⭐ FINAL FIX
  register: UseFormRegister<T>;
  options: Option[];
};

/* ================= COMPONENT ================= */

export default function SelectInput<T extends FieldValues>({
  label,
  name,
  register,
  options,
}: Props<T>) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>

      <select {...register(name)} className="w-full border rounded-md p-2">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
