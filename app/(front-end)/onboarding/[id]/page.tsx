import NewSellerForm from "@/components/backoffice/NewSellerForm";
import { getData } from "@/lib/getData";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function OnboardingPage({ params }: PageProps) {
  const user = await getData(`users/${params.id}`);

  return (
    <div className="flex flex-col gap-6 p-16">
      <div className="max-w-4xl mx-auto p-4">
        <h2>Hello {user?.name}, Tell More About Yourself</h2>
      </div>

      <NewFarmerForm user={user} />
    </div>
  );
}