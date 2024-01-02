import { getServerSession } from "next-auth";
import UserDisplay from "../Components/UserDisplay";
import Fortune from "../Components/Fortune";
import { authOptions } from "../api/auth/[...nextauth]/authoptions_callbacks_google";

export default async function Subpage() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1 className="text-xl font-bold">Subpage</h1>
      <p className="text-xs h-6">
        {session && session.user?.name} / {session?.user?.email}
      </p>
      <UserDisplay />
      <Fortune />
    </>
  );
}
