"use client";

import {
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;          // ⭐ FIX HERE
  register: UseFormRegister<T>;
  trueTitle: string;
  falseTitle: string;
};

export default function ToggleInput<T extends FieldValues>({
  label,
  name,
  register,
  trueTitle,
  falseTitle,
}: Props<T>) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>

      <div className="flex items-center gap-2">
        <span className="text-sm">{falseTitle}</span>

        <input type="checkbox" {...register(name)} />

        <span className="text-sm">{trueTitle}</span>
      </div>
    </div>
  );
}
