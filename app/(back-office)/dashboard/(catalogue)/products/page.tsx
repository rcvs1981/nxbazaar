import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getProducts } from "@/actions/products";
import { columns } from "./columns";
import { auth } from "@/auth";

export default async function Page() {

  const session = await auth();

  if (!session?.user?.id) return null;

  const role = session.user.role;
  const userId = session.user.id;

  // ✅ SERVER FILTER (IMPORTANT)
  const products = await getProducts({
    userId: role === "ADMIN" ? undefined : userId,
  });

  return (
    <div>

      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkTitle="Add Product"
      />

      <div className="py-8">
        <DataTable data={products} columns={columns} />
      </div>

    </div>
  );
}