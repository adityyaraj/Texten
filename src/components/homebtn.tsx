"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
const Homebtn = () => {
     const router = useRouter()
        const goToHome = () => {
        router.push('/home')
    }
  return (
     <button className='btn-main' onClick={goToHome}>Home</button>
  )
}

export default Homebtn