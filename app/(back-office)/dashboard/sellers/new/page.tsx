import FormHeader from "@/components/backoffice/FormHeader";
import NewSellerForm from "@/components/backoffice/NewSellerForm";

export default function Page() {

  const user = {
    id: "temp-user-id"
  };

  return (
    <div className="space-y-4">
      <FormHeader title="New Seller" />
      <NewSellerForm user={user} />
    </div>
  );
}