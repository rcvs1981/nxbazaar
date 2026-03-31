import Heading from "@/components/backoffice/Heading";
import LargeCards from "@/components/backoffice/LargeCards";
import SmallCards from "@/components/backoffice/SmallCards";
import DashboardCharts from "@/components/backoffice/DashboardCharts";
import SellerDashboard from "@/components/backoffice/SellerDashboard";
import UserDashboard from "@/components/backoffice/UserDashboard";
import { auth } from "@/auth";

import { getOrders } from "@/actions/orders";
import { getProducts } from "@/actions/products";
import { getSales } from "@/actions/sales";

export default async function Page() {
  const session = await auth();
  const role = session?.user?.role;

  const products = await getProducts();
const orders = await getOrders();
const sales = await getSales();

  if (role === "USER") return <UserDashboard />;
  if (role === "SELLER") return <SellerDashboard />;

  return (
    <div>
      <Heading title="Dashboard Overview" />
      <LargeCards sales={sales} />
      <SmallCards orders={orders} />
      <DashboardCharts sales={sales} />
    </div>
  );
}