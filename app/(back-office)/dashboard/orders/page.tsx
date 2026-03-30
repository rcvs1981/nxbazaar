import OrderCard from "@/components/Order/OrderCard";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { getOrdersByUser } from "@/actions/order";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await Session(auth);

  // ✅ Proper auth handling
  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;

  // ✅ Direct DB query (optimized)
  const orders = await getOrdersByUser(userId);

  if (!orders || orders.length === 0) {
    return <p>No Orders Yet</p>;
  }

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Your Orders
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Check the status of your orders
            </p>
          </div>

          <ul className="mt-8 space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}