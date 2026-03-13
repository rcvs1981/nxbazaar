import FormHeader from "@/components/backoffice/FormHeader";
import BannerForm from "@/components/backoffice/Forms/BannerForm";
import { getBanner } from "@/actions/banner";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UpdateBanner({ params }: PageProps) {

  const { id } = await params;

  const bannerResponse = await getBanner(id);

  if (!bannerResponse.success || !bannerResponse.data) {
    return <div className="p-6 text-red-500">Banner not found</div>;
  }

  return (
    <div>
      <FormHeader title="Update Banner" />
      <BannerForm updateData={bannerResponse.data} />
    </div>
  );
}