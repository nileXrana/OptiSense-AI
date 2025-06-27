"use client"
import React, { useContext, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserContext } from '@/context/UserProvider'

const userLogger = () => {
  const { user, isSignedIn } = useUser()
  const {User,setUser} = useContext(UserContext);
  useEffect(() => {
    if (isSignedIn && user){
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
