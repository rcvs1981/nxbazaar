import PageHeader from '@/components/backoffice/PageHeader'
import React from 'react'
import TableActions from "@/components/backoffice/TableActions";
//import {DataTable} from "@/components/data-table-components/DataTable";
export default function page() {
 return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkTitle="Add Category"
      />

    
        <TableActions />
      </div>
    
  );
}