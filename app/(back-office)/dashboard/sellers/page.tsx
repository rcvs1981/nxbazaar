import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { columns } from "./columns";
import { getSellers } from "@/actions/Seller";

export default async function Page() {

  const sellers = await getSellers();

  return (
    <div className="space-y-4">

      <PageHeader
        heading="Sellers"
        href="/dashboard/sellers/new"
        linkTitle="Add Seller"
      />

      <DataTable
        data={sellers}
        columns={columns}
        filterKeys={["name"]}
      />

    </div>
  );
}