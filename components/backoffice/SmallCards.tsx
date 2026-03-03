import { Order } from "@/types/dashboard";

interface Props {
  orders: Order[];
}

export default function SmallCards({ orders }: Props) {

  const count = orders.length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-6 border rounded-xl">Total Orders: {count}</div>
    </div>
  );
}
