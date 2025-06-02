

import {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
  FieldErrors,
  RegisterOptions
} from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  isRequired?: boolean;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  validation?: RegisterOptions<T, Path<T>>;
}

export default function TextInput<T extends FieldValues>({
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
  validation,
}: TextInputProps<T>) {
  const error = errors?.[name];
  const inputProps = register(name, {
    required: isRequired ? `${label} is required` : false,
    ...validation,
  });

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
          type={type}
          id={name}
          disabled={disabled}
          defaultValue={defaultValue}
          autoComplete={autoComplete ?? name}
          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-700 dark:focus:ring-slate-500 sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-100 ${
            disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""
          } ${error ? "ring-red-500 focus:ring-red-500" : ""}`}
          placeholder={placeholder ?? `Type the ${label.toLowerCase()}`}
          aria-invalid={error ? "true" : "false"}
        />
        {error && (
          <span className="text-sm text-red-600 dark:text-red-400 mt-1 block">
            {error.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
}