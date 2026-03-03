"use client";

import { Table } from "@tanstack/react-table";

type Props<TData> = {
  table: Table<TData>;
};

export default function DataTableViewOptions<TData>({ table }: Props<TData>) {
  return (
    <div className="text-sm text-muted-foreground">
      Columns: {table.getAllColumns().length}
    </div>
  );
}
