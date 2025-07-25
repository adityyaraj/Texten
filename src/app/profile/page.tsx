"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dp from "@/components/dp";
import ImageModal from "@/components/imagemodal";

const ProfilePage = () => {
  const [selectedPost, setSelectedPost] = useState<{
    username: undefined;
    imageUrl: string;
    content: string | null;
    createdAt: string; 
  } | null>(null);
  
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/user');
        if (!userResponse.ok) {
          router.push('/front');
          return;
        }
        const userData = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(`/api/post?authorId=${userData.id}`);
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setPosts(postsData.map((post: any) => ({
            ...post,
            username: post.author?.username ?? userData.username
          })));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push('/front');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-primary-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="flex h-screen flex-col gap-50 md:gap-0">
      <div className=" ">
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
        </div>
      </div>
     </div>
      <div className="flex items-center justify-center mt-8 max-w-5xl w-full mx-auto h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-10 md:p-0">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className=" cursor-pointer"
              onClick={() => setSelectedPost({
                imageUrl: post.imageUrl,
                content: post.content,
                createdAt: post.createdAt,
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

export default ProfilePage;