import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      firstname?: string;
      lastname?: string;
      email: string;
      picture?: string;
      address?: string;
      role?: string;
    } & DefaultSession["user"];
    accessToken?: string | undefined;
    error?: string | undefined;
  }

  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {}
  /** The OAuth profile returned from your provider */
  interface Profile {
    given_name?: string; // Google
    family_name?: string; // Google
  }
}

import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    firstname?: string;
    lastname?: string;
    accessToken?: string | undefined;
    error?: string | undefined;
    role?: string | undefined;
    exp?: string | undefined;
    iat?: string | undefined;
  }
}
