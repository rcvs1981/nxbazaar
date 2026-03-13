import SalesInvoice from "@/components/Order/SalesInvoice";
import { getSingleOrder } from "@/actions/orders";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const order = await getSingleOrder(params.id);

  if (!order) {
    notFound();
  }

  return <SalesInvoice order={order} />;
}