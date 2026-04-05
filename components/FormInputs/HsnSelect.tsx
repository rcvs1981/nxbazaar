"use client";

import { useState } from "react";
import { useHsn } from "@/hooks/useHsn";

type Props = {
  onChange: (value: { id: string; gstRate: number }) => void;
};

export default function HsnSelect({ onChange }: Props) {
  const [search, setSearch] = useState("");

  const { data, loading } = useHsn(search);

  return (
    <div className="w-full relative">

      {/* INPUT */}
      <input
       label="Search HSN Code"
        type="text"
        placeholder="Search HSN Code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full p-2 rounded-md
          bg-[#E8DCC4] text-black
          border border-gray-300
          focus:ring-2 focus:ring-orange-500
          outline-none
        "
      />

      {/* DROPDOWN */}
      {search && (
        <ul
          className="
            absolute z-50 w-full mt-1
            max-h-40 overflow-y-auto
            rounded-md
            border border-gray-300
            bg-[#E8DCC4]
            shadow-lg
          "
        >
          {/* LOADING */}
          {loading && (
            <li className="p-2 text-sm text-gray-500">
              Loading...
            </li>
          )}

          {/* NO DATA */}
          {!loading && data?.length === 0 && (
            <li className="p-2 text-sm text-gray-500">
              No results found
            </li>
          )}

          {/* LIST */}
          {(data ?? []).map((item) => (
            <li
              key={item.id}
              className="
                p-2 cursor-pointer
                text-black
                hover:bg-orange-200
                transition
              "
              onClick={() => {
                onChange({
                  id: item.id,
                  gstRate: item.gstRate,
                });
                setSearch(item.code);
              }}
            >
              <div className="flex justify-between">
                <span>{item.code}</span>
                <span className="text-xs text-gray-600">
                  {item.gstRate}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}