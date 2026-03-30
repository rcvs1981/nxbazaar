import Image from "next/image";
import { Row } from "@tanstack/react-table";

interface Props<TData> {
  row: Row<TData>;
  accessorKey: string;
}

export default function ImageColumn<TData>({
  row,
  accessorKey,
}: Props<TData>) {
  const imageUrl = row.getValue(accessorKey) as string;

  if (!imageUrl) return null;

  return (
    <div className="relative w-10 h-10">
      <Image
        src={imageUrl}
        alt="image"
        fill
        className="rounded-full object-cover"
      />
    </div>
  );
}