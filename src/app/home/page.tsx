import React from 'react'
import { auth } from '@/lib/auth'
import Link from 'next/link'

const HomePage = async () => {
  const session = await auth()
  
  if (!session || !session.user) {
     return (
            <div className="min-h-screen">
                <div className="flex items-center justify-center flex-col h-screen">
                    <h2 className="text-2xl font-bold text-primary-foreground rounded-xl px-4 py-2 inline-block">Not authenticated</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Please log in to view your profile</p>
                    <Link href="../front" className="inline-block mt-4 px-4 py-2 bg-g1 text-primary-foreground rounded-lg hover:bg-grey-700">
                        Go to Login
                    </Link>
                </div>
            </div>
        )
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
