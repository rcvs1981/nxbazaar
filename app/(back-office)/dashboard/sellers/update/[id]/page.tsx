import FormHeader from "@/components/backoffice/FormHeader";
import NewSellerForm from "@/components/backoffice/NewSellerForm";
import { getSellers } from "@/lib/get";

type Props = {
  params: {
    id: string;
  };
};

export default async function UpdateSeller({ params }: Props) {

  const seller = await getData(`sellers/${params.id}`);

  return (
    <div className="space-y-4">

      <FormHeader title="Update Seller" />

      <NewSellerForm user={seller} isEdit={true} />

    </div>
  );
}