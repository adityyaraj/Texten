"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Suggestions = () => {
  const { data: session } = useSession();
  const currentUsername = session?.user?.name;
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUsername) return;
    fetch(`/api/user/suggestions?exclude=${encodeURIComponent(currentUsername)}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [currentUsername]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-center relative p-2">
        <h3 className="text-primary-foreground font-bold text-2xl">
          People you may know
        </h3>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {users.length === 0 && <div className="text-gray-500">No suggestions found.</div>}
        {users.map((user) => (
        <Link href={`/${user.username}`} className="text-primary-foreground no-underline" key={user.id}>
          <div className="flex items-center gap-3">
            <img
              src={user.profileImage}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">@{user.username}</div>
              <div className="text-gray-500 text-sm">{user.name}</div>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Suggestions