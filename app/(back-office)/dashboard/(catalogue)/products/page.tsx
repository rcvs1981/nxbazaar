import PageHeader from "@/components/backoffice/PageHeader"
import DataTable from "@/components/data-table-components/DataTable"

import { columns } from "./columns"
import { getProducts } from "@/actions/products"

import { productsSchema, Product } from "@/lib/validators/productSchema"

export default async function Page() {

  const rawProducts = await getProducts("")

  const products: Product[] = productsSchema.parse(rawProducts)

  return (
    <div>

      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkTitle="Add Product"
      />

      <div className="py-8">
        <DataTable<Product>
          data={products}
          columns={columns}
        />
      </div>

    </div>
  )
}