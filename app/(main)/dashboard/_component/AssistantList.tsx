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
import { BlurFade } from '@/src/components/magicui/blur-fade'
import AddNewAssistant from './AddNewAssistant'

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
      setselectedAssistant(result[0])
    }
    fun();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/save-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
        })
      })
      const result = await res.json();
      setUSER(result)
    }
    fetchData();
  }, [user])

  // All useState and useContext :
  const [myAssistants, setmyAssistants] = useState([])
  const { selectedAssistant, setselectedAssistant } = useContext<any>(AssistantContext)
  const [USER, setUSER] = useState<any>() // user details from backend :
  return (
    <div className='p-3 bg-secondary h-screen relative'>
      <BlurFade duration={0.4}>
        <h1 className='font-bold text-md text-center'>
          Your Personal AI Assistants
        </h1>
      </BlurFade>
      <BlurFade duration={0.8}>
        <AddNewAssistant >
          <Button className='w-full mt-3 cursor-pointer'>
            Add New Assistant
          </Button>
        </AddNewAssistant>
      </BlurFade>
      <BlurFade duration={1.2}>
        <Input className='bg-white mt-3 mb-3' placeholder='Search' />
      </BlurFade>
      <div className='overflow-scroll h-[60%]'>
        {myAssistants.map((assistant: ASSISTANT, index) => (
          <BlurFade key={index} duration={0.3 * index}>
            <div key={index} className={`p-2 flex gap-3 items-center hover:bg-gray-300 hover:dark:bg-slate-700 cursor-pointer rounded-xl ${assistant.id == selectedAssistant?.id && 'bg-purple-300 hover:bg-purple-300'} `} onClick={() => { setselectedAssistant(assistant) }}>
              <Image src={assistant.image} alt={assistant.name} width={60} height={60}
                className='rounded-xl w-[60px] h-[60px] object-cover'>
              </Image>
              <div>
                <h1 className='text-md font-bold'>{assistant.name}</h1>
                <h1 className='text-sm text-gray-600 dark:text-gray-300'>{assistant.title}</h1>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
      <div className='absolute bottom-22 left-2 flex gap-3 items-center bg-gray-300 px-3 py-2 rounded-2xl w-[92%] cursor-pointer hover:bg-gray-400'>
        <UserButton afterSignOutUrl="/signin" />
        <div className='text-[14px]'>
          <p className='font-bold'>
            {USER?.name}
          </p>
          <p className='text-gray-600 hover:text-pink-800 cursor-pointer'>
            {USER?.orderId ? "Pro Plan" : "Free Plan"}
          </p>
        </div>
      </div>

    </div>
  )
}

export default AssistantList
