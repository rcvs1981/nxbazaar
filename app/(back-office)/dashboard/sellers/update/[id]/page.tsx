import FormHeader from "@/components/backoffice/FormHeader";
import NewSellerForm from "@/components/backoffice/NewSellerForm";
import { getSellerById } from "@/actions/Seller";

type Props = {
  params: {
    id: string;
  };
};

export default async function UpdateSeller({ params }: Props) {
  const response = await getSellerById(params.id);

  // ✅ proper error handling
  if (!response.success) {
    return (
      <div className="text-red-500 p-4">
        {response.error || "Failed to load seller"}
      </div>
    );
  }

  const seller = response.data;

  return (
    <div className="space-y-4">
      <FormHeader title="Update Seller" />

      <NewSellerForm user={seller} isEdit />
    </div>
  );
}