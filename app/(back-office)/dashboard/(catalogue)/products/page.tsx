import PageHeader from "@/components/backoffice/PageHeader"
import DataTable from "@/components/data-table-components/DataTable"
import { columns } from "./columns"
import { getProducts } from "@/actions/products"
import { Products } from "@/types/products"
import ProductsClient from "./ProductsClient"

export default async function Page() {
  const products: Product[] = await getProducts()

    

  return (
    <div>
      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkTitle="Add Product"
      />

      <div className="py-0">
        <ProductsClient
          initialData={products}
        />
      </div>
    </div>
  )
}