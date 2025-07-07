import React from 'react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { User, Mail, Calendar, Settings } from 'lucide-react'

const ProfilePage = async () => {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect('/')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
    redirect('/')
  }

  return (
    <div className="p-6">
      

    </div>
  )
}

export default ProfilePage