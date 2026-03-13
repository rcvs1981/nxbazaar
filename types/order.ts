export type CheckoutFormData = {
  userId: string

  firstName: string
  lastName: string
  email: string
  phone: string

  address?: string
  city?: string
  state?: string
  country?: string
  zip?: string

  paymentMethod: string

  subTotal: number
  shippingCost: number
}

export type OrderItemInput = {
  id: string
  vendorId: string
  title: string
  imageUrl: string
  salePrice: number
  qty: number
}