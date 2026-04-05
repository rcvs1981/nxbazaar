"use client";

import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

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
        className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
        {...register(name, {
          // ✅ multiple select handling
          setValueAs: (value) => {
            if (multiple) {
              return Array.from(value as unknown as string[]);
            }
            return value;
          },
        })}
      >
        {!multiple && <option value="">Select option</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}