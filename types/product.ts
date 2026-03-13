export interface ProductRequest {
  id: string

  title: string
  slug: string
  description?: string

  barcode?: string
  sku?: string
  productCode?: string

  categoryId: string
  sellerId: string

  productPrice: number
  salePrice: number

  wholesalePrice?: number
  wholesaleQty?: number

  productStock: number
  qty?: number

  unit?: string
  tags: string[]

  imageUrl?: string
  productImages: string[]

  isActive: boolean
  isWholesale: boolean

  hsnCodeId?: string

  createdAt: Date
  updatedAt: Date
}


/* CREATE PRODUCT */

export type CreateProductInput = Omit<
  ProductRequest,
  "id" | "createdAt" | "updatedAt"
>


/* UPDATE PRODUCT */

export type UpdateProductInput = Partial<CreateProductInput>


/* SELECT OPTIONS */

export type SelectOption = {
  label: string
  value: string
}