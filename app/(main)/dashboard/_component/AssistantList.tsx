"use client"
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useEffect } from 'react'
import Image from 'next/image'
import { ASSISTANT } from '../../ai-assistants/page'
import { AssistantContext } from '@/context/AssistantContext'
import { UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs'

const AssistantList = () => {
  const { user, isSignedIn } = useUser()
  useEffect(() => {
    const fun = async () => {
      const res = await fetch("/api/is-selected", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      setmyAssistants(result)
    }
    fun();

  }, [])

  useEffect(() => {
    if (!isSignedIn){
      console.log("not sign in ");
      return;
    }
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
      }
      fetchData();
  }, [])
  

  const [myAssistants, setmyAssistants] = useState([])
  const { selectedAssistant, setselectedAssistant } = useContext<any>(AssistantContext)

  return (
    <div className='p-3 bg-secondary h-screen'>
      <h1 className='font-bold text-md text-center'>
        Your Personal AI Assistants
      </h1>
      <Button className='w-full mt-3'>
        Add New Assistant
      </Button>
      <Input className='bg-white mt-3 mb-1' placeholder='Search' />
      <div>
        {myAssistants.map((assistant: ASSISTANT, index) => (
          <div key={index} className={`p-2 flex gap-3 items-center hover:bg-gray-300 hover:dark:bg-slate-700 cursor-pointer rounded-xl ${assistant.id == selectedAssistant?.id && 'bg-sky-300 hover:bg-sky-300'} `} onClick={() => { setselectedAssistant(assistant) }}>
            <Image src={assistant.image} alt={assistant.name} width={60} height={60}
              className='rounded-xl w-[60px] h-[60px] object-cover'>
            </Image>
            <div>
              <h1 className='text-md font-bold'>{assistant.name}</h1>
              <h1 className='text-sm text-gray-600 dark:text-gray-300'>{assistant.title}</h1>
            </div>
          </div>
        ))}
      </div>
      <div>
        <UserButton afterSignOutUrl="/login" />
        <h1></h1>
      </div>

    </div>
  )
}

export default AssistantList
