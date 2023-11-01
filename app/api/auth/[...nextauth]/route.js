import NextAuth from "next-auth/next";
import UserModel from "@/models/userModel";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/database";

connectDB();

/* configuration setting for next auth */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  /* redirect to root url */
  pages: {
    signIn: "/",
  },
  callbacks: {
    /* when sign in, receives profile information as parameter  */
    async signIn({ profile }) {
      console.log(profile);
      return await signInWithOAuth({ profile });
    },
    /* jwt called whenever json web token is created or updated
    receives token object, retrieves user data from the database
    based on the email stored in the token */
    async jwt({ token }) {
      const user = await getUserByEmail({ email: token.email });
      token.user = user;
      return token;
    },
    /* update user session */
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

/* check if user exists in database based on email
if not , create a user using provided OAuth profile data */
async function signInWithOAuth({ profile }) {
  const user = await UserModel.exists({ email: profile.email });
  if (user) return true;

  const newUser = new UserModel({
    name: profile.name,
    email: profile.email,
    avatar: profile.picture,
  });
  await newUser.save();
  return true;
}

/* retrieves user data from database based on provided email */
async function getUserByEmail({ email }) {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Email does not exist...");

  const newUser = {
    ...user._doc,
    _id: user._id.toString(),
    total_followers: user.followers.length,
    total_followings: user.followings.length,
    followers: [],
    followings: [],
    my_user: true,
  };
  return newUser;
}
