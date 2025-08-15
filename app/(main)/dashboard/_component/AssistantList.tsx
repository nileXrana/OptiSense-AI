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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, UserCircle, WalletCardsIcon } from 'lucide-react'
import Profile from './Profile'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from '@radix-ui/react-progress'

const AssistantList = () => {

  const { user, isSignedIn } = useUser()
  const [openProfile, setopenProfile] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

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
            <div key={index} className={`p-2 flex gap-3 items-center hover:bg-gray-300 hover:dark:bg-slate-700 cursor-pointer rounded-xl ${assistant.name == selectedAssistant?.name && 'bg-purple-300 hover:bg-purple-300'} `} onClick={() => { setselectedAssistant(assistant) }}>
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


      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger>
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
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-[200px] p-1 m-3'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            setDropdownOpen(false);
            setTimeout(() => setOpenDialog(true), 100);
          }}> <UserCircle /> Profile</DropdownMenuItem>
          <DropdownMenuItem> <LogOut /> LogOut</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* dialog opens when someone clicks profile  */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              View your profile information and token usage
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col">
            <div className='flex gap-4 my-2 items-center'>
              {user && user.imageUrl && (
                <Image
                  src={user.imageUrl}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-gray-200"
                />
              )}
              <div className="text-left">
                <h2 className="font-semibold text-lg">{user?.fullName || 'User'}</h2>
                <p className="text-gray-600 text-sm">{user?.primaryEmailAddress?.emailAddress || 'No email'}</p>
              </div>
            </div>
            <hr className='my-3'></hr>
            <div className='p-2 flex flex-col gap-2'>
              <h3 className='font-bold'>Token Usage</h3>
              <p>0/0</p>
              <Progress value={33} />
              <p className='flex p-1 items-center justify-between font-bold'>Current Plan <span className='bg-gray-200 p-2 text-sm rounded-md'>{USER?.orderId ? "Pro Plan" : "Free Plan"}</span></p>
            </div>
            <div className='p-4 border rounded-xl'>
              <div className='flex justify-between items-center  gap-1'>
                <div className='flex flex-col gap-1'>
                  <h2 className='font-bold text-lg'>Pro Plan</h2>
                  <h2>500,000 Tokens</h2>
                </div>
                <h2 className='font-bold text-lg'>$10 / Month</h2>
              </div>
              <hr className='my-3' />
              <Button className='w-full'> <WalletCardsIcon /> Upgrade</Button>
            </div>
            <div className='mt-3 flex justify-end'>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AssistantList
