import FormHeader from "@/components/backoffice/FormHeader";
import NewSellerForm from "@/components/backoffice/NewSellerForm";

export default function Page() {
  return (
    <div className="space-y-4">
      <FormHeader title="New Seller" />
      <NewSellerForm />
    </div>
  );
}