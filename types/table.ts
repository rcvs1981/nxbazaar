import { Row, Column } from "@tanstack/react-table";

export interface TableRowProps<T> {
  row: Row<T>;
  accessorKey: string;
}

export interface SortableColumnProps<T> {
  column: Column<T, unknown>;
  title: string;
}
