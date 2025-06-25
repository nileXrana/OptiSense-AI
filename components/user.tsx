"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

export default function UserLogger() {
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      console.log("User ID:", user.id)
      console.log("Email:", user.primaryEmailAddress?.emailAddress)
      console.log("Name:", user.fullName)
    }
  }, [user])

  return null
}
