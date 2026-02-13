import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        // Return null if user data could not be retrieved
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        console.log({ user, account, profile, email, credentials });

        const usersCollection = await dbConnect(collections.USERS);
        const isExist = await usersCollection.findOne({
          email: user.email,
        });
        
        if (isExist) {
          console.log("User exists, allowing sign in");
          return true;
        }

        console.log("Creating new user");
        const newUser = {
          provider: account?.provider,
          email: user.email,
          name: user.name,
          image: user.image,
          role: "user",
        };
        const result = await usersCollection.insertOne(newUser);
        console.log("User creation result:", result);

        return true; // Always return true if we reach here
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return true; // Allow sign in even if DB fails (you can change this to false if you want strict DB requirement)
      }
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token, user, trigger, newSession }) {
      if (token) {
        session.user.role = token?.role;
        session.user.email = token?.email;
        session.user.id = token?.id;
        session.user.name = token?.name;
        session.user.contact = token?.contact;
        session.user.nid = token?.nid;
      }
      
      // Handle session update trigger
      if (trigger === "update" && newSession) {
        session.user = { ...session.user, ...newSession.user };
      }
      
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser, trigger, session }) {
      console.log("account data in token", token);
      
      // Handle JWT update trigger
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }
      
      if (user) {
        if (account?.provider == "google") {
          const usersCollection = await dbConnect(collections.USERS);
          const dbUser = await usersCollection.findOne({
            email: user.email,
          });
          token.role = dbUser?.role;
          token.email = dbUser?.email;
          token.id = dbUser?._id?.toString();
          token.name = dbUser?.name;
          token.contact = dbUser?.contact || "";
          token.nid = dbUser?.nid || "";
        } else {
          token.role = user?.role;
          token.email = user?.email;
          token.id = user?.id;
          token.name = user?.name;
          token.contact = user?.contact || "";
          token.nid = user?.nid || "";
        }
      }
      return token;
    },
  },
};
