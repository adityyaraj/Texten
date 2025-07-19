"use client";
import React from "react";
// Removed direct Prisma usage; will fetch from API
import { notFound, useRouter } from "next/navigation";
import Dp from "@/components/dp";
import ImageModal from "@/components/imagemodal";
import { useState, useEffect } from "react";

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const UserProfilePage = ({ params }: UserProfilePageProps) => {
  // @ts-ignore
  const { username } = React.use(params) as { username: string };
    const [selectedPost, setSelectedPost] = useState<{
      username: undefined;
      imageUrl: string;
      content: string | null;
      createdAt: string; // Change to string since it comes from API as string
    } | null>(null);

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

  // Reserved usernames that should not be allowed
  const reservedUsernames = [
    'api', 'home', 'admin', 'auth', 'front', 'web', 'log', 'signup', 'login',
    'profile', 'settings', 'help', 'about', 'contact', 'privacy', 'terms'
  ];

  if (reservedUsernames.includes(username.toLowerCase())) {
    notFound();
  }

  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      setLoading(true);
      // Fetch user using new API route
      const userRes = await fetch(`/api/user/${encodeURIComponent(username)}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        if (!userData) {
          setUser(null);
          setLoading(false);
          return;
        }
        setUser(userData);
        // Fetch posts for user
        const postsRes = await fetch(`/api/post?username=${encodeURIComponent(username)}`);
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setPosts(postsData || []);
        } else {
          setPosts([]);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUserAndPosts();
  }, [username]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  if (!user) {
    notFound();
    return null;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="bg-primary w-full">
        <div className="flex items-center justify-center border-b border-gray-500 relative p-2">
          <div className="absolute left-4 block md:hidden text-g1 font-bold text-3xl">
            Texten
          </div>
          <div className="text-primary-foreground font-semibold text-3xl">
            @{user.username}
          </div>
        </div>
      </div>
      <div className="mt-20 max-w-3xl md:mx-auto px-25 md:px-4 flex w-full gap-8 md:gap-16">
        <div className="rounded-full w-32 h-32 mb-4 overflow-hidden">
          <Dp imageUrl={user.profileImage} />
        </div>
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="text-primary-foreground font-semibold text-2xl">
            {user.name}
          </div>
          <div className="text-primary rounded-xl bg-primary-foreground px-2 py-1">@{user.username}</div>
          <div className="text-gray-500">
            Public Profile
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-8 max-w-5xl w-full mx-auto h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className=" cursor-pointer"
              onClick={() => setSelectedPost({
                imageUrl: post.imageUrl,
                content: post.content,
                createdAt: post.createdAt, // Keep as string
                username: post.author?.username ?? post.username ?? undefined
              })}
            >
              <img
                src={post.imageUrl}
                alt={post.content || "Post image"}
                className="w-full h-100 md:h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {selectedPost && (
        <ImageModal
          imageUrl={selectedPost.imageUrl}
          username={selectedPost.username ?? undefined}
          content={selectedPost.content ?? undefined}
          uploadDate={new Date(selectedPost.createdAt)} // Convert string to Date here
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
