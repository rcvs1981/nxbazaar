import SalesInvoice from "@/components/Order/SalesInvoice";
import api from "@/lib/axios";
import { Order } from "@/types/order";

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Params) {
  const { data } = await api.get<Order>(
    `/orders/${params.id}`
  );

  return <SalesInvoice order={data} />;
}