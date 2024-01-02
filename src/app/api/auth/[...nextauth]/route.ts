import NextAuth from "next-auth/next";
import { authOptions } from "./authoptions_callbacks_google";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
