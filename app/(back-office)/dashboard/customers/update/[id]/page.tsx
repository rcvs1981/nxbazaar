import CustomerForm from "@/components/backoffice/CustomerForm";
import FormHeader from "@/components/backoffice/FormHeader";
import { getCustomer } from "@/actions/customers";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UpdateCustomer({ params }: PageProps) {
  const { id } = await params;

  const user = await getCustomer(id);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <FormHeader title="Update Customer" />
      <CustomerForm user={user} />
    </div>
  );
}