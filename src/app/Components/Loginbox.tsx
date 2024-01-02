"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/authoptions_callbacks_google";

export default function LoginBox() {
  const { data: session, status } = useSession();
  const handleLoginClick = () => {
    signIn("google");
  };
  const handleLogoutClick = () => {
    signOut();
  };

  switch (status) {
    case "authenticated":
      return (
        <button
          className="rounded border shadow py-1 px-2 bg-red-400 text-white"
          onClick={handleLogoutClick}
        >
          Log Out
        </button>
      );
    case "loading":
      return (
        <button className="rounded border shadow py-1 px-2 bg-gray-400 text-white">
          ...
        </button>
      );
    default:
      return (
        <button
          className="rounded border shadow py-1 px-2 bg-blue-400 text-white"
          onClick={handleLoginClick}
        >
          Log in
        </button>
      );
  }
}
