"use client"
import React, { useContext, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserContext } from '@/context/UserProvider'
import { useRouter } from 'next/navigation'

const userLogger = () => {
  const router = useRouter()
  const { user, isSignedIn } = useUser()
  const { User, setUser } = useContext(UserContext);
  useEffect(() => {
    if (isSignedIn && user) {
      const getUserAssistants = async () => {
        // send user details to backend :
        const res = await fetch('/api/save-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user?.firstName || user.primaryEmailAddress?.emailAddress.split("@")[0],
            picture: user.imageUrl
          })
        })
        const resu = await res.json();
        setUser(resu) // user details is saved in state :

        // check if user has selected assistants or not :
        const result = await fetch("/api/is-selected", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail: user.primaryEmailAddress?.emailAddress
          })
        })
        const data = await result.json()
        if (data.length > 0) {
          router.push('/dashboard')
        } else {
          router.push('/ai-assistants')
        }
      }

      getUserAssistants();
    }
  }, [user, isSignedIn])

  return (
    <div></div>
  )
}

export default userLogger
