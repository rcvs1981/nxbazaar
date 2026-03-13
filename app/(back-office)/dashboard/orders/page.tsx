import OrderCard from "@/components/Order/OrderCard";
import { getOrders } from "@/actions/orders";

export default async function Page() {
  const orders = await getOrders();

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
              Check the status of recent and old orders
            </p>
          </div>

          <ul className="mt-8 space-y-5 lg:mt-12">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}