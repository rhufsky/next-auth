import UserDisplay from "@/app/Components/UserDisplay";
import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions_callbacks_google";
import { getServerSession } from "next-auth";

export default async function SubpageId({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1 className="text-xl font-bold">Subpage ID {params.id}</h1>
      <p className="text-xs h-6">
        {session && session.user?.name} / {session?.user?.email}
      </p>
      <UserDisplay />
    </>
  );
}
