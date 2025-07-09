'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { User } from 'lucide-react';
import Image from 'next/image'

interface DpProps {
  imageUrl?: string | null;
  name?: string | null;
}

const Dp: React.FC<DpProps> = ({ imageUrl, name }) => {
  
   if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={`${name}'s profile picture`}
        width={128}
        height={128}
        className="w-full h-full object-cover"
        unoptimized
      />
    );
  }


  return (
   <div className="w-full h-full bg-gray-300 flex items-center justify-center">
      <span className="text-gray-600 text-4xl">
        {name ? name[0].toUpperCase() : "?"}
      </span>
    </div>
  )
}

export default Dp