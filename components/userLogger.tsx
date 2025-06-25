"use client"
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

const userLogger = () => {
  const { user, isSignedIn } = useUser()
  useEffect(() => {
    if (isSignedIn && user){
      console.log("signed in beta")
      fetch('/api/save-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName
        })
      })
    }
  }, [user,isSignedIn])
  
  return (
    <div>
      
    </div>
  )
}

export default userLogger
