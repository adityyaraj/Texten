import React from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Dp from "@/components/dp";

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const { username } = await params;

  // Reserved usernames that should not be allowed
  const reservedUsernames = [
    'api', 'home', 'admin', 'auth', 'front', 'web', 'log', 'signup', 'login',
    'profile', 'settings', 'help', 'about', 'contact', 'privacy', 'terms'
  ];

  if (reservedUsernames.includes(username.toLowerCase())) {
    notFound();
  }

  // Find user by username (case insensitive)
  const user = await prisma.user.findUnique({
    where: { 
      username: username.toLowerCase() 
    },
    select: {
      id: true,
      name: true,
      username: true,
      profileImage: true,
      // Don't expose email or password
    }
  });

  // If user not found, show 404
  if (!user) {
    notFound();
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
    </div>
  );
};

export default UserProfilePage;
