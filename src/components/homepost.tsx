import React from "react";
import { prisma } from "@/lib/db";
import Link from "next/link";

const HomePagePosts = async () => {
  let posts: Array<{
    id: string;
    content: string | null;
    imageUrl: string;
    createdAt: Date;
    author: {
      username: string | null;
    };
  }> = [];

  try {
    posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc", // Fetch posts in descending order of creation
      },
      include: {
        author: {
          select: { username: true }
        }
      }
    });

    // Shuffle posts randomly
    posts = posts.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
   <div className="flex flex-col gap-6 p-4 overflow-y-auto h-screen mt-4">
  {posts.map((post) => (
    <div
      key={post.id}
      className="w-full max-w mx-auto md:max-w-lg border border-primary-foreground/10 rounded-sm flex flex-col"
      style={{ aspectRatio: "1 / 1" }} // Makes the card square
    >
      <Link href={`/${post.author.username}`} className="p-2 text-primary-foreground hover:underline">
        @{post.author.username || "Unknown User"}
      </Link>
      {/* Image container */}
      <div className="w-full h-5/6 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={"Post image"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex justify-between h-1/6 items-center">
        <div>
          <p className="text-sm text-gray-600">{post.content}</p>
          <p className="text-xs text-primary font-semibold mt-1">Uploaded by: @{post.author.username}</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Uploaded on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  ))}
</div>

  );
};

export default HomePagePosts;