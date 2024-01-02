"use client";

import { useSession } from "next-auth/react";

export default function UserDisplay() {
  const { data: session, status } = useSession();

  return (
    <div className="border rounded shadow p-4 text-sm sm:w-1/3">
      <p>Username: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
