import { getServerSession } from "next-auth";
import LoginBox from "./Components/Loginbox";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/authoptions_callbacks_google";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className="text-xl font-bold">Main Page</h1>

      <div className="py-6">
        <LoginBox />
      </div>
    </>
  );
}
