import React from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Dp from "@/components/dp";

const ProfilePage = async () => {
  let session;
  try {
    session = await auth();
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/front");
  }

  if (!session || !session.user) {
    redirect("/front");
  }

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    redirect("/front");
  }

  if (!user) {
    redirect("/front");
  }

  let posts: Array<{
    id: string;
    title: string;
    content: string | null;
    imageUrl: string;
    createdAt: Date;
  }> = [];
  try {
    posts = await prisma.post.findMany({
      where: { authorId: user.id },
      orderBy: {
        createdAt: "desc", // Fetch posts in descending order of creation
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="bg-primary w-full">
        <div className="flex items-center justify-center border-b border-gray-500 relative p-2">
          <div className="absolute left-4 block md:hidden text-g1 font-bold text-3xl">
            Texten
          </div>
          <div className="text-primary-foreground font-semibold text-3xl">
            My Profile
          </div>
        </div>
      </div>
      <div className="mt-20 max-w-4xl md:mx-auto px-25 md:px-4 flex w-full gap-8 md:gap-16 md:border-b border-gray-500 pb-8 bg-primary">
        <div className="rounded-full w-32 h-32 mb-4 overflow-hidden">
          <Dp imageUrl={user.profileImage || user.image} name={user.name} />
        </div>
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="text-primary-foreground font-semibold text-2xl">
            {user.name}
          </div>
          <div className="text-primary rounded-xl bg-primary-foreground px-2 py-1">
            @{user.username}
          </div>

          <div className="text-gray-500 text-sm">
            Private Profile - Only you can see this
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-8 max-w-5xl w-full mx-auto h-full rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4 shadow-md">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="text-lg font-bold mt-2">{post.title}</h3>
          <p className="text-sm text-gray-500">{post.content}</p>
          <p className="text-xs text-gray-400">
            Uploaded on: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
