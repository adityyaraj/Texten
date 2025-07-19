import React from "react";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import HomePagePosts from "@/components/homepost";
import Suggestions from "@/components/suggestions";

const HomePage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/front");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen">
      <div className="bg-primary md:w-3/5 w-full">
        <div className="flex items-center justify-center border-b border-gray-500 relative p-2">
          <div className="absolute left-4 block md:hidden text-g1 font-bold text-3xl">
            <div className="flex items-center justify-center bg-primary">
              <h1 className="text-3xl font-extrabold bg-gradient-to-b from-green-400 to-green-700 text-transparent bg-clip-text drop-shadow-[0_4px_4px_rgba(0,255,0,0.3)]">
                Texten
              </h1>
            </div>
          </div>
          <div className="text-primary-foreground font-semibold text-3xl">
            Posts
          </div>
        </div>
        <div>
          <HomePagePosts />
        </div>
      </div>
      <div className="hidden md:block border-l border-gray-500 bg-primary md:w-2/5">
        <Suggestions />
      </div>
    </div>
  );
};

export default HomePage;
