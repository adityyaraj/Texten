"use client";
import Link from "next/link";
import React from "react";
import { Home, Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Dp from "./dp";
import Logotbnt from "./logotbnt";
import { useSession } from "next-auth/react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import PostUploadModal from "./postuploadmodel";


const Navbar = () => {
  const { data: session } = useSession();
  const [showPostModal, setShowPostModal] = useState(false);

  const user = {
    profileImage: (session?.user as any)?.profileImage || null,
    name: session?.user?.name || "User"
  };

  return (
    <>
          {showPostModal && (
        <PostUploadModal onClose={() => setShowPostModal(false)} />
      )}


    <div className="fixed bottom-0 w-full md:static md:h-full md:w-full bg-primary p-2 md:p-4 flex justify-evenly md:justify-start items-center md:flex-col md:gap-8 gap-2 md:items-start border-t border-t-gray-500 md:border-t-0">
      <Link className="hidden md:block mx-auto" href="/home">
        <h1 className="text-g1 text-4xl text-center font-extrabold"><div className="flex items-center justify-center bg-primary">
              <h1 className="text-6xl font-extrabold bg-gradient-to-b from-green-400 to-green-700 text-transparent bg-clip-text drop-shadow-[0_4px_4px_rgba(0,255,0,0.3)]">
                Texten
              </h1>
            </div></h1>
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
       <button
          onClick={() => setShowPostModal(true)}
          className="link-main"
        >
          <div className="flex items-center gap-2">
            <PlusCircle size={30} />
            <span className="hidden md:inline">Post</span>
          </div>
        </button>
      <Link href="/settings" className="link-main">
        <div className="flex items-center gap-2">
          <Settings size={30} />
          <span className="hidden md:inline">Settings</span>
        </div>
      </Link>
      <ThemeToggle />
      <Logotbnt />
    </div>
        </>
  );
};

export default Navbar;