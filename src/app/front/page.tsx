'use client'
import React, { useEffect } from "react";
import { Marquee3D } from "../../components/marquee";
import Log from "@/app/web/log/page";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Front = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    
    if (session) {
      // User is signed in, redirect to home
      router.push("/home");
    }
  }, [session, status, router]);

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <Log />
      </div>
      <div className="hidden w-1/2 md:flex items-center justify-center">
        <div className="w-full">
          <div><Image src="/bg.png" alt="Description" layout="responsive" width={500} height={500} /></div>
        </div>
      </div>
    </div>
  );
};

export default Front;
