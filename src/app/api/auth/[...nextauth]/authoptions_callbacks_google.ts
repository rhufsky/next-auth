import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ADMIN_USER_EMAIL = "rhufsky@gmail.com";

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "No ID",
      clientSecret: process.env.GOOGLE_SECRET || "No secret",
    }),
  ],
  //  session: {
  //    maxAge: 60 * 2,
  //  },
  //  jwt: { maxAge: 60 * 2 },

  callbacks: {
    /**
     * called at login time, can be used to make additional checks.
     * @param param0
     * @returns true: login successful, false: login failed
     */
    async signIn({ user, account, profile, email, credentials }) {
      console.log("============== Signin requested");

      const privilegedEmails = [ADMIN_USER_EMAIL, "anotheruser@gmail.com"];

      // check if users's email address is in the list of privoleged emails
      if (privilegedEmails.includes(user.email || "")) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * called when a jwt is generated
     * at the first call after a login, user, account, profile are defined,
     * at any other call, these are undefined
     * @param param0 called when a jwt is generated.
     * @returns
     */

    async jwt({ token, user, account, profile }) {
      console.log("============== JWT requested");
      if (token.iat && token.exp) {
        console.log("JWT IAT: " + new Date(+token.iat * 1000));
        console.log("JWT EXP: " + new Date(+token.exp * 1000));
      } else {
        console.log("JWT    : iat or exp not set");
      }
      // Initial sign in
      if (profile && account && user) {
        return {
          ...token,
          firstname: profile.given_name,
          lastname: profile.family_name,
          role: user.email === ADMIN_USER_EMAIL ? "admin" : "user",
        };
      }

      const maxAge = authOptions.session?.maxAge || 60 * 60;

      return {
        ...token,
        //        iat: Date.now() / 1000,
        //        exp: (Date.now() + maxAge * 1000) / 1000,
      };
    },

    /**
     * called when a session is created or requested, can use the token to store values in the session.
     * @param param0
     * @returns
     */
    async session({ session, token, user }) {
      console.log("============== session requested");
      if (token.iat && token.exp) {
        console.log("JWT IAT: " + new Date(+token.iat * 1000));
        console.log("JWT EXP: " + new Date(+token.exp * 1000));
      } else {
        console.log("JWT    : iat or exp not set");
      }
      console.log("SES EXP: " + new Date(session.expires));

      if (token) {
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
