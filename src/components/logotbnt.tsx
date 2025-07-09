"use client"
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import React from 'react'

const Logotbnt = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/front" });
  };

  return (
    <button
        onClick={handleLogout}
        className="flex items-center gap-2 link-main"
      >
        <LogOut size={30} />
        <span className="hidden md:inline">Logout</span>
      </button>
  )
}

export default Logotbnt