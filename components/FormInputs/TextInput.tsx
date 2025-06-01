"use client";

import { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  register?: any; // Consider using proper react-hook-form types
  errors?: Record<string, FieldError>;
  isRequired?: boolean;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  ref?: ForwardedRef<HTMLInputElement>;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      name,
      register,
      errors,
      isRequired = true,
      type = "text",
      className = "sm:col-span-2",
      defaultValue = "",
      placeholder,
      disabled = false,
      autoComplete,
    },
    ref
  ) => {
    const inputProps = register
      ? register(name, { required: isRequired })
      : { name, defaultValue };

    return (
      <div className={className}>
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="mt-2">
          <input
            {...inputProps}
            ref={ref}
            type={type}
            id={name}
            disabled={disabled}
            autoComplete={autoComplete || name}
            className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-700 dark:focus:ring-slate-500 sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-100 ${
              disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""
            } ${errors?.[name] ? "ring-red-500 focus:ring-red-500" : ""}`}
            placeholder={
              placeholder || `Type the ${label.toLowerCase()}` 
            }
          />
          {errors?.[name] && (
            <span className="text-sm text-red-600 dark:text-red-400 mt-1 block">
              {errors[name].message || `${label} is required`}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;