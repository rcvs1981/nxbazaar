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
    <div className="space-y-6">

      {/* 🔥 Heading */}
      <div className="
        relative p-[1px] rounded-2xl
        bg-gradient-to-r from-purple-500/40 to-indigo-500/40
      ">
        <div className="glass rounded-2xl p-4">
          <Heading title="Dashboard Overview 🚀" />
        </div>
      </div>

      {/* 🧱 BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* 📊 MAIN CHART */}
        <div className="
          md:col-span-2
          group relative p-[1px] rounded-2xl
          bg-gradient-to-r from-purple-500/30 to-pink-500/30
        ">
          <div className="
            glass rounded-2xl p-4
            transition-all duration-300
            group-hover:scale-[1.01]
            group-hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]
          ">
            <DashboardCharts sales={sales} />
          </div>
        </div>

        {/* 📊 LARGE CARDS */}
        <div className="
          group relative p-[1px] rounded-2xl
          bg-gradient-to-r from-indigo-500/30 to-blue-500/30
        ">
          <div className="
            glass rounded-2xl p-4
            transition-all duration-300
            group-hover:scale-[1.03]
            group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]
          ">
            <LargeCards sales={sales} />
          </div>
        </div>

        {/* 📦 SMALL CARDS */}
        <div className="
          group relative p-[1px] rounded-2xl
          bg-gradient-to-r from-emerald-500/30 to-teal-500/30
        ">
          <div className="
            glass rounded-2xl p-4
            transition-all duration-300
            group-hover:scale-[1.03]
            group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]
          ">
            <SmallCards orders={orders} />
          </div>
        </div>

      </div>

      {/* 📈 FULL WIDTH */}
      <div className="
        relative p-[1px] rounded-2xl
        bg-gradient-to-r from-pink-500/30 to-purple-500/30
      ">
        <div className="
          glass rounded-2xl p-4
          hover:shadow-[0_0_50px_rgba(236,72,153,0.3)]
          transition-all duration-300
        ">
          <DashboardCharts sales={sales} />
        </div>
      </div>

    </div>
  );
}