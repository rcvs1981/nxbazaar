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
    <Image
      src={imageUrl}
      width={40}
      height={40}
      alt="image"
      className="rounded-full object-cover"
    />
  );
}
