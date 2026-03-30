export interface CheckoutFormData {
  city: string;
  country: string;
  district: string;
  email: string;
  firstName: string;
  lastName: string;
  paymentMethod: string;
  phone: string;
  shippingCost: string | number;
  streetAddress: string;
  userId: string;
}

export interface OrderItemInput {
  id: string;
  title: string;
  imageUrl: string;
  qty: string | number;
  salePrice: string | number;
  vendorId: string;
}

export interface CreateOrderPayload {
  checkoutFormData: CheckoutFormData;
  orderItems: OrderItemInput[];
}