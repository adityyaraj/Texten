import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if(!email || !password) {
          throw new Error("Email and password are required");
        }
        const user = await prisma.user.findUnique({where:{email}});
        if(!user || !user.password) {
          throw new Error("User not found or password not set");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }
       
        return user;
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // When user signs in with Google, save their image to profileImage field
      if (account?.provider === "google" && profile?.picture) {
        try {
          await prisma.user.update({
            where: { email: user.email! },
            data: { 
              profileImage: profile.picture // Save Google image to profileImage
            }
          });
        } catch (error) {
          console.error("Error updating user profile image:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        
        // Fetch the latest user data including profileImage
        try {
          const user = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { profileImage: true }
          });
          
          (session.user as any).profileImage = user?.profileImage;
        } catch (error) {
          console.error("Error fetching user profile image:", error);
        }
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      // If url is already absolute, return it
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // If url is a relative path, resolve it
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: "/front",
  }
});