import PageHeader from '@/components/backoffice/PageHeader';
import TableActions from "@/components/backoffice/TableActions";
//import { DataTable } from "@/components/data-table-components/DataTable";
//import { columns } from "./columns";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header with Add Category button */}
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkTitle="Add Category"
      
      />

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {/* Table Actions (search, filters, etc.) */}
        <TableActions />
        
       
        
      </div>
    </div>
  );
}