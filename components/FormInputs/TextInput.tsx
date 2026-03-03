"use client";

import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;          // ⭐ FINAL FIX
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
};

export default function TextInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = "text",
}: Props<T>) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>

      <input
        type={type}
        {...register(name)}
        className="w-full border rounded-md p-2"
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors[name]?.message ?? "")}
        </p>
      )}
    </div>
  );
}
