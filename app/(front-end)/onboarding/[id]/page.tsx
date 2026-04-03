import NewSellerForm from "@/components/backoffice/NewSellerForm";
import { getUserById } from "@/actions/users";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  let user = null;

  try {
    user = await getUserById(params.id);
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }

  // 🔥 Better UX than plain error
  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-16">
      <div className="max-w-4xl p-4 mx-auto">
        <h2 className="text-xl font-semibold">
          Hello {user.name}, Tell More About Yourself 👋
        </h2>
      </div>

      <NewSellerForm user={user} />
    </div>
  );
}