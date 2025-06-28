"use client"
import React, { useContext, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserContext } from '@/context/UserProvider'
import { useRouter } from 'next/navigation'

const userLogger = () => {
  const router = useRouter()
  const { user, isSignedIn } = useUser()
  const {User,setUser} = useContext(UserContext);
  useEffect(() => {
    if (isSignedIn && user){
      // redirect to ai-assistants page :
      router.push('/ai-assistants')
      // send user details to backend :
      const fetchData = async ()=>{
        const res =  await fetch('/api/save-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
            picture: user.imageUrl
          })
        })
        const result = await res.json();
        setUser(result) // user details is saved in state :
      }
      fetchData();
    }
  }, [user,isSignedIn])
  
  return (
    <div></div>
  )
}

export default userLogger
