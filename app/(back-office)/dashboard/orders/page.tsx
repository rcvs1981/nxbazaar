import { auth } from "@/auth";
import {db} from "@/lib/db";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return <p>Unauthorized</p>;
  }

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: { orderItems: true },
  });

  if (!orders.length) {
    return <p>No Orders Yet</p>;
  }

  return (
    <div>
      {orders.map((order) => (
        <p key={order.id}>{order.orderNumber}</p>
      ))}
    </div>
  );
}