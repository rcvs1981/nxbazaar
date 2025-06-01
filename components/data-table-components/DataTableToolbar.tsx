"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterKeys: string[];
}

export function DataTableToolbar<TData>({
  table,
  filterKeys,
}: DataTableToolbarProps<TData>) {
  const isFiltered = filterKeys.some(
    (key) => table.getState().columnFilters?.some((f) => f.id === key && f.value)
  );

  const handleInputChange = (key: string, value: string) => {
    table.getColumn(key)?.setFilterValue(value);
  };

  const handleResetClick = () => {
    filterKeys.forEach((key) => {
      table.getColumn(key)?.setFilterValue("");
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
       {filterKeys.map((key) => {
  const filterValue = table.getColumn(key)?.getFilterValue();
  return (
    <Input
      key={key}
      placeholder={`Filter ${key}...`}
      value={typeof filterValue === "string" ? filterValue : ""}
      onChange={(event) => handleInputChange(key, event.target.value)}
      className="h-8 w-[150px] lg:w-[250px]"
    />
  );
})}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
