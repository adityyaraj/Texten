"use client";
import Link from "next/link";
import React from "react";
import { Home, Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Dp from "./dp";
import Logotbnt from "./logotbnt";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const user = {
    profileImage: (session?.user as any)?.profileImage || null,
    name: session?.user?.name || "User"
  };

  return (
    <div className="fixed bottom-0 w-full md:static md:h-full md:w-full bg-primary p-2 md:p-4 flex justify-evenly md:justify-start items-center md:flex-col md:gap-8 gap-2 md:items-start border-t border-t-gray-500 md:border-t-0">
      <Link className="hidden md:block mx-auto" href="/home">
        <h1 className="text-g1 text-4xl text-center font-extrabold">Texten</h1>
      </Link>
  
      <Link href="/home" className="link-main">
        <div className="flex items-center gap-2">
          <Home size={30} />
          <span className="hidden md:inline">Home</span>
        </div>
      </Link>
      <Link href="/profile" className="link-main">
        <div className="flex items-center gap-2">
         <span className="rounded-full overflow-hidden w-7 h-7">
           <Dp imageUrl={user.profileImage} name={user.name} />
         </span> 
          <span className="hidden md:inline">Profile</span>
        </div>
      </Link>
      <Link href="/settings" className="link-main">
        <div className="flex items-center gap-2">
          <Settings size={30} />
          <span className="hidden md:inline">Settings</span>
        </div>
      </Link>
      <ThemeToggle />
      <Logotbnt />
    </div>
  );
};

export default Navbar;