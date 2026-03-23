"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type SearchFormProps = {
  placeholderContent?: string;
};

type SearchFormData = {
  searchTerm: string;
};

export default function SearchForm({
  placeholderContent = "Search Products, Categories, Markets...",
}: SearchFormProps) {
  const { register, handleSubmit, reset } = useForm<SearchFormData>();
  const router = useRouter();

  function handleSearch(data: SearchFormData) {
    const { searchTerm } = data;

    if (!searchTerm) return;

    router.push(`/search?search=${encodeURIComponent(searchTerm)}`);

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="flex items-center w-full"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <div className="relative w-full">

        {/* icon */}

        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>

        {/* input */}

        <input
          {...register("searchTerm", { required: true })}
          type="text"
          id="search"
          placeholder={placeholderContent}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      {/* button */}

      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-lime-700 rounded-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700"
      >
        <Search className="w-4 h-4 me-2" />
        Search
      </button>
    </form>
  );
}