import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderContainer from "./Components/ProviderContainer";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ReactNode } from "react";
import { authOptions } from "./api/auth/[...nextauth]/authoptions_callbacks_google";
import TimeBox from "./Components/TimeBox";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextAuth Demo",
  description: "For the best of the best",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode[];
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="p-8">
          <div className="p-2">
            <ProviderContainer session={session}>
              <div className="flex content-baseline">
                <div>
                  <h1 className="text-2xl font-bold">Login Demo</h1>
                  <p className="text-xs h-6">
                    {session &&
                      `${session.user?.name} / ${session?.user?.email}`}
                  </p>
                </div>
                <div className="ml-4 h-4 border">
                  {session?.user?.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "Image"}
                      width={45}
                      height={45}
                    />
                  )}
                </div>
              </div>
              <ul className="flex gap-2 border-b mb-4">
                <li>
                  <Link href="/" className="py-2  hover:font-bold">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/subpage" className="py-2  hover:font-bold">
                    Subpage
                  </Link>
                </li>
                <li>
                  <Link href="/subpage/42" className="py-2  hover:font-bold">
                    Subpage 43
                  </Link>
                </li>
              </ul>

              {children}
            </ProviderContainer>
          </div>

          <div className="border-t mt-6">
            <TimeBox />
          </div>
        </main>
      </body>
    </html>
  );
}
