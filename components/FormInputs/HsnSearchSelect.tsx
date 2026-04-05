"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useHsn } from "@/hooks/useHsn";
import { useDebounce } from "@/hooks/useDebounce";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/* ================= TYPES ================= */

type HsnItem = {
  id: string;
  code: string;
  title: string;
  gstRate: number;
};

type Props = {
  value?: HsnItem | null;
  onChange: (value: HsnItem) => void;
};

/* ================= COMPONENT ================= */

export default function HsnSearchSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debounced = useDebounce(search);

  const { data = [], isLoading } = useHsn(debounced) as {
    data: HsnItem[];
    isLoading: boolean;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* ================= TRIGGER ================= */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between 
          bg-white dark:bg-slate-900 
          border border-gray-300 dark:border-slate-700
          text-black dark:text-white"
        >
          {value
            ? `${value.code} - ${value.title} (${value.gstRate}%)`
            : "Select HSN Code"}

          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      {/* ================= DROPDOWN ================= */}
      <PopoverContent
        className="w-full p-0 
        bg-white dark:bg-slate-900 
        border border-gray-200 dark:border-slate-700 
        text-black dark:text-white shadow-lg"
      >
        <Command className="bg-white dark:bg-slate-900 text-black dark:text-white">

          {/* 🔍 SEARCH */}
          <CommandInput
            placeholder="Search HSN code..."
            value={search}
            onValueChange={setSearch}
            className="bg-white dark:bg-slate-900 text-black dark:text-white"
          />

          {/* ❌ EMPTY / LOADING */}
          <CommandEmpty className="text-gray-500 dark:text-gray-400 p-2">
            {isLoading ? "Loading..." : "No HSN found"}
          </CommandEmpty>

          {/* ✅ LIST */}
          <CommandGroup className="max-h-64 overflow-y-auto scrollbar-thin dark:scrollbar-thumb-slate-700">
            {data.map((item) => (
              <CommandItem
                key={item.id}
                value={item.code}
                onSelect={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className="cursor-pointer 
                hover:bg-orange-100 dark:hover:bg-slate-800
                data-[selected=true]:bg-orange-200 dark:data-[selected=true]:bg-slate-700"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {item.code}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                   {item.code} - {item.title} ({item.gstRate}%)
                  </span>
                </div>

                {/* ✅ CHECK ICON */}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value?.id === item.id
                      ? "opacity-100 text-orange-500"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>

        </Command>
      </PopoverContent>
    </Popover>
  );
}
