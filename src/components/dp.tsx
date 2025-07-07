'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { User } from 'lucide-react';

const Dp = () => {
  const { data: session } = useSession()
  
  if (!session || !session.user) {
    return (
      <User size={25} className="text-muted-foreground"/>
    )
  }

  return (
    <img
      src={session.user.image || '/placeholder-avatar.png'}
      alt={session.user.name || 'User Avatar'}
      className="w-full h-full object-cover"
    />
  )
}

export default Dp