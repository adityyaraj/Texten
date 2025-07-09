"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Navbar from "./navbar";

const ConditionalNavbar = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex h-screen">
        <div className="w-full bg-primary h-full overflow-y-auto">
          {children}
        </div>
      </div>
    );
  }

  // If user is authenticated, show navbar layout
  if (session) {
    return (
      <div className="flex h-screen">
        <div className="md:w-1/6 bg-primary h-full md:flex md:border-r md:border-gray-500">
          <Navbar />
        </div>
        <div className="w-full md:w-5/6 bg-primary h-full overflow-y-auto">
          {children}
        </div>
      </div>
    );
  }

  // If user is not authenticated, show full-width layout without navbar
  return (
    <div className="flex h-screen">
      <div className="w-full bg-primary h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default ConditionalNavbar;
