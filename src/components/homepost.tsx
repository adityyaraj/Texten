import React from "react";
import { prisma } from "@/lib/db";

const HomePagePosts = async () => {
  let posts: Array<{
    id: string;
    title: string;
    content: string | null;
    imageUrl: string;
    createdAt: Date;
  }> = [];

  try {
    posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc", // Fetch posts in descending order of creation
      },
    });

    // Shuffle posts randomly
    posts = posts.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
   <div className="flex flex-col gap-6 p-4 overflow-y-auto h-screen">
  {posts.map((post) => (
    <div
      key={post.id}
      className="w-full max-w-sm mx-auto border rounded-lg shadow-md bg-primary-foreground hover:shadow-lg transition-shadow duration-300 flex flex-col"
      style={{ aspectRatio: "1 / 1" }} // Makes the card square
    >
      {/* Image container */}
      <div className="w-full h-1/2 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-1/2">
        <div>
          <h3 className="text-lg font-bold text-primary mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600">{post.content}</p>
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