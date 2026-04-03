import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>Please login</div>;
  }

  const { user } = session;

  return (
    <div>
      <h2>Welcome {user?.name}</h2>
    </div>
  );
}