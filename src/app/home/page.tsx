import React from 'react'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

const HomePage = async () => {
  const session = await auth()
  
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
      <div className='bg-primary md:w-3/5 w-full'>
      <div className='flex items-center justify-center border-b border-gray-500 relative p-2'>
      <div className='absolute left-4 block md:hidden text-g1 font-bold text-3xl'>Texten</div>
      <div className='text-primary-foreground font-semibold text-3xl'>Posts</div>
      </div>
      </div>
      <div className='hidden md:block border-l border-gray-500 bg-primary md:w-2/5'>hi</div>
    </div>
  )
}

export default HomePage
