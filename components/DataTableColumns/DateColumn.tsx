import { TableRowProps } from "@/types/table";

export default function DateColumn<T>({
  row,
  accessorKey,
}: TableRowProps<T>) {
  const dateValue = row.getValue(accessorKey) as string;

  const date = new Date(dateValue);

  return (
    <span>
      {date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </span>
  );
}
