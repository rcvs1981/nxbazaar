import { Sale } from "@/types/dashboard";

type Props = {
  sales: Sale[];
};

export default function LargeCards({ sales }: Props) {
  const totalRevenue = sales.reduce((acc, item) => acc + item.total, 0);
  const totalSales = sales.length;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="bg-card p-6 rounded-xl border">
        <p className="text-muted-foreground">Total Revenue</p>
        <h2 className="text-3xl font-bold mt-2">
          ₹ {totalRevenue}
        </h2>
      </div>

      <div className="bg-card p-6 rounded-xl border">
        <p className="text-muted-foreground">Total Sales</p>
        <h2 className="text-3xl font-bold mt-2">
          {totalSales}
        </h2>
      </div>
    </div>
  );
}
