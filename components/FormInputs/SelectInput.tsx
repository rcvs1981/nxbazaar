"use client";

import React from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options: Option[];
  multiple?: boolean;
  className?: string;
};

export default function SelectInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  options,
  multiple = false,
  className,
}: Props<T>) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

    <select
  multiple={multiple}
  className={`border rounded-lg p-2 w-full ${className}`}
  {...register(name)}
>
  {!multiple && <option value="">Select option</option>}

  {options.map((option, index) => (
    <option key={`${option.value}-${index}`} value={option.value}>
      {option.label}
    </option>
  ))}
</select>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}