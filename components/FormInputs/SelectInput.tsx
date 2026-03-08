"use client";

import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

type Option = {
  id: string;
  title?: string;
  name?: string;
};

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options: Option[];
  className?: string;
};

export default function SelectInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  options,
  className,
}: Props<T>) {
  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium">{label}</label>

      <select
        {...register(name)}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
      >
        <option value="">Select {label}</option>

        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title || option.name}
          </option>
        ))}
      </select>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors[name]?.message || "")}
        </p>
      )}
    </div>
  );
}