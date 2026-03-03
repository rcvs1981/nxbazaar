"use client";

import { useState } from "react";

type Props = {
  label: string;
  items: string[];
  setItems: (items: string[]) => void;
  placeholder?: string;
};

export default function ArrayItemsInput({
  label,
  items,
  setItems,
  placeholder = "Add item",
}: Props) {
  const [value, setValue] = useState<string>("");

  function addItem() {
    if (!value.trim()) return;
    setItems([...items, value]);
    setValue("");
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="border rounded-md p-2 w-full"
        />
        <button
          type="button"
          onClick={addItem}
          className="px-3 bg-black text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {items.map((item, i) => (
          <span
            key={i}
            className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2"
          >
            {item}
            <button type="button" onClick={() => removeItem(i)}>
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
