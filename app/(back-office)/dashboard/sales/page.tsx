import Heading from "@/components/backoffice/Heading";
import DataTable from "@/components/data-table-components/DataTable";
import { columns } from "./columns";

import { auth } from "@/auth";
import { getSales } from "@/actions/sales";

export default async function SalesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <p>Unauthorized</p>;
  }

  const userId = session.user.id;
  const role = session.user.role;

  // ✅ Server-side DB call
  const allSales = await getSales();

  // ✅ Vendor filter
  const sellerSales =
    role === "ADMIN"
      ? allSales
      : allSales.filter(
          (sale) => sale.vendorId === userId
        );

  return (
    <div className="py-8">
      <Heading title="Sales" />
      <DataTable
        data={sellerSales}
        columns={columns}
      />
    </div>
  );
}