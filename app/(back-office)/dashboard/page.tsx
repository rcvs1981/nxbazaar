import DashboardCharts from "@/components/backoffice/DashboardCharts";
import Heading from "@/components/backoffice/Heading";
import LargeCards from "@/components/backoffice/LargeCards";
import SmallCards from "@/components/backoffice/SmallCards";
import { demoSales, demoOrders, demoProducts } from "@/lib/demo-data";
import CustomDataTable from "@/components/backoffice/CustomDataTable";

export default function DashboardPage() {
  const sales = demoSales;
  const orders = demoOrders;
  const products = demoProducts;

  return (
    <div>
      <Heading title="Dashboard Overview" />

      {/* Large Cards */}
      <LargeCards sales={sales} />

      {/* Small cards */}
      <SmallCards orders={orders} />

      {/* Charts */}
      <DashboardCharts products={products} sales={sales} />

      {/* Recent Orders Table */}
      <CustomDataTable orders={orders} />
    </div>
  );
}
