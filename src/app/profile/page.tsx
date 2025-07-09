import React from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Dp from "@/components/dp";
import Link from "next/link";
import Uploadertbn from "../web/uploader/page";



const ProfilePage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/front");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/front");
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
      <div className="mt-20 max-w-3xl md:mx-auto px-25 md:px-4 flex w-full gap-8 md:gap-16">
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
          <Uploadertbn />

          <Link
            href={`/${user.username}`}
            className="text-blue-500 hover:underline text-sm"
          >
            View Public Profile
          </Link>
          <div className="text-gray-500 text-sm">
            Private Profile - Only you can see this
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
