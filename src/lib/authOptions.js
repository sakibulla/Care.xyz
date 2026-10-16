import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        try {
          const user = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });

          // Return null if user data could not be retrieved
          return user;
        } catch (err) {
          throw new Error(err.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        console.log("=== SIGNIN CALLBACK ===");
        console.log("User:", user);
        console.log("Account provider:", account?.provider);
        console.log("Profile:", profile);

        const usersCollection = await dbConnect(collections.USERS);
        const isExist = await usersCollection.findOne({
          email: user.email,
        });
        
        if (isExist) {
          console.log("✅ User exists, allowing sign in");
          return true;
        }

        console.log("📝 Creating new user from OAuth");
        const newUser = {
          provider: account?.provider,
          email: user.email,
          name: user.name,
          image: user.image,
          role: "user",
          createdAt: new Date(),
        };
        const result = await usersCollection.insertOne(newUser);
        console.log("✅ User creation result:", result.insertedId);

        return true;
      } catch (error) {
        console.error("❌ Error in signIn callback:", error);
        return false;
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
      console.log("JWT callback - user:", user, "account:", account?.provider);
      
      // Handle JWT update trigger
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }
      
      if (user) {
        if (account?.provider === "google") {
          try {
            const usersCollection = await dbConnect(collections.USERS);
            const dbUser = await usersCollection.findOne({
              email: user.email,
            });
            
            if (dbUser) {
              token.role = dbUser?.role;
              token.email = dbUser?.email;
              token.id = dbUser?._id?.toString();
              token.name = dbUser?.name;
              token.contact = dbUser?.contact || "";
              token.nid = dbUser?.nid || "";
            } else {
              // User doesn't exist in DB yet (shouldn't happen as signIn creates them)
              token.role = "user";
              token.email = user.email;
              token.id = user.id;
              token.name = user.name;
              token.contact = "";
              token.nid = "";
            }
          } catch (err) {
            console.error("Error fetching user from DB in JWT callback:", err);
            // Don't throw - let the token continue with basic info
            token.role = "user";
            token.email = user.email;
            token.id = user.id;
            token.name = user.name;
            token.contact = "";
            token.nid = "";
          }
        } else {
          // Credentials provider
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
