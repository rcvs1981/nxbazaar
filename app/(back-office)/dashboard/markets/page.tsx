
import { getMarkets } from "@/actions/market";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable  from "@/components/data-table-components/DataTable";
import { columns } from "./columns";
export default async function Page() {
  const markets = await getMarkets(); 

  return (
    <div>
      <PageHeader
        heading="Markets"
        href="/dashboard/markets/new"
        linkTitle="Add Market"
      />

      <DataTable data={markets} columns={columns} />
    </div>
  );
}