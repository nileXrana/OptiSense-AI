"use client"
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useEffect } from 'react'
import Image from 'next/image'
import { ASSISTANT } from '../../ai-assistants/page'
import { AssistantContext } from '@/context/AssistantContext'
import { UserButton } from "@clerk/nextjs";
import { useClerk, useUser } from "@clerk/nextjs";
import { BlurFade } from '@/src/components/magicui/blur-fade'
import AddNewAssistant from './AddNewAssistant'
import CheckoutButton from './CheckoutButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, UserCircle, WalletCardsIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from '@/components/ui/progress'
import { useRouter } from "next/navigation";

interface AssistantListProps {
  preloadedAssistants?: ASSISTANT[]
  onMobileClose?: () => void
  initialUserData?: any
}

const AssistantList = ({ preloadedAssistants = [], onMobileClose, initialUserData }: AssistantListProps) => {

  const { user, isSignedIn } = useUser()
  const { signOut } = useClerk();
  const router = useRouter();
  const [openProfile, setopenProfile] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [refresh, setrefresh] = useState(false)

  useEffect(() => {
    if (preloadedAssistants.length > 0) {
      // Use preloaded assistants if available
      setmyAssistants(preloadedAssistants)
      if (!selectedAssistant) {
        setselectedAssistant(preloadedAssistants[0])
      }
    } else {
      // Fallback to API call if no preloaded data
      const fun = async () => {
        // Wait for user to be loaded before making API call
        if (!user?.primaryEmailAddress?.emailAddress) {
          console.log("User email not available yet, waiting...");
          return;
        }
        
        const res = await fetch("/api/is-selected", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: user?.primaryEmailAddress?.emailAddress
          })
        });
        const result = await res.json();
        
        if (!Array.isArray(result) || result.length === 0) {
          console.log("No assistants found for user:", user?.primaryEmailAddress?.emailAddress);
          alert("No assistants found. Please create one.")
          router.push('/signin')
          return;
        }
        setmyAssistants(result)
        setselectedAssistant(result[0])
      }
      fun();
    }
  }, [preloadedAssistants, user])

  useEffect(() => {
    // Use initial user data from parent if available
    if (initialUserData) {
      setUSER(initialUserData);
    } else if (user) {
      // Fallback to fetch if no initial data
      const fetchInitialUserData = async () => {
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
      fetchInitialUserData();
    }
  }, [user, initialUserData])

  useEffect(() => {
    fetchData()
  }, [refresh])


  const fetchData = async () => {
    const res = await fetch('/api/save-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user?.primaryEmailAddress?.emailAddress,
      })
    })
    const result = await res.json();
    // console.log('User data received:', result)
    
    // Check if result has required properties
    if (result && typeof result.credits !== 'undefined' && typeof result.tokenUsed !== 'undefined') {
      setUSER(result)

      // one more work :
      const ak = result.tokenUsed / result.credits * 100
      if (ak >= 100) {
        setprogress(100)
        setUSER((prev: object) => ({
          ...prev,
          tokenUsed: result.credits, // Fixed: use result.credits instead of USER.credits
        }));
      }
      else setprogress(ak)
    } else {
      // console.error('Invalid user data received:', result)
      // Set default values if API fails
      setUSER({
        credits: 100000,
        tokenUsed: 0,
        name: 'Unknown User',
        email: 'unknown@email.com'
      })
      setprogress(0)
    }
  }

  function signOFF() {
    signOut()
    router.push("/")
  }

  // Handle assistant selection - close mobile overlay if on mobile
  const handleAssistantSelection = (assistant: ASSISTANT) => {
    setselectedAssistant(assistant)
    // Close mobile overlay if callback is provided (mobile only)
    if (onMobileClose) {
      onMobileClose()
    }
  }

  // All useState and useContext :
  const [progress, setprogress] = useState(0)
  const [myAssistants, setmyAssistants] = useState<ASSISTANT[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { selectedAssistant, setselectedAssistant } = useContext<any>(AssistantContext)
  const [USER, setUSER] = useState<any>() // user details from backend :

  // Function to refresh assistants list
  const refreshAssistants = async () => {
    try {
      // Make sure user email is available
      if (!user?.primaryEmailAddress?.emailAddress) {
        console.log("User email not available for refresh");
        return;
      }
      
      const res = await fetch("/api/is-selected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userEmail: user?.primaryEmailAddress?.emailAddress
        })
      });
      const result = await res.json();
      
      if (Array.isArray(result) && result.length > 0) {
        setmyAssistants(result)
        if (!selectedAssistant) {
          setselectedAssistant(result[0])
        }
      }
    } catch (error) {
      console.error("Error refreshing assistants:", error)
    }
  }

  // Filter assistants based on search term
  const filteredAssistants = (Array.isArray(myAssistants) ? myAssistants : []).filter((assistant: ASSISTANT) =>
    assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assistant.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='p-3 bg-zinc-200 dark:bg-gray-900 h-screen w-full relative'>
      <BlurFade duration={0.4}>
        <h1 className='font-bold text-md text-center dark:text-gray-100'>
          Your Personal AI Assistants
        </h1>
      </BlurFade>
      <BlurFade duration={0.8}>
        <AddNewAssistant onAssistantAdded={refreshAssistants}>
          <Button className='w-full mt-3 cursor-pointer'>
            Add New Assistant
          </Button>
        </AddNewAssistant>
      </BlurFade>
      <BlurFade duration={1.2}>
        <Input
          className='bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 mt-3 mb-3 text-center'
          placeholder='Search Assistants'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </BlurFade>
      <div className='overflow-scroll h-[60vh] '>
        {filteredAssistants.length > 0 ? (
          filteredAssistants.map((assistant: ASSISTANT, index) => (
            <BlurFade key={index} duration={0.3 * index}>
              <div key={index} className={`p-2 flex gap-3 items-center hover:bg-gray-300 dark:hover:bg-slate-700 cursor-pointer rounded-xl ${assistant.name == selectedAssistant?.name && 'bg-blue-300 dark:bg-blue-600 hover:!bg-blue-300 dark:hover:!bg-blue-600'} `} onClick={() => handleAssistantSelection(assistant)}>
                <Image src={assistant.image} alt={assistant.name} width={60} height={60}
                  className='rounded-xl object-cover' style={{ width: '60px', height: '60px' }}>
                </Image>
                <div>
                  <h1 className='text-md font-bold dark:text-gray-100'>{assistant.name}</h1>
                  <h1 className='text-sm text-gray-600 dark:text-gray-300'>{assistant.title}</h1>
                </div>
              </div>
            </BlurFade>
          ))
        ) : (
          <div className='p-4 text-center text-gray-500 dark:text-gray-400'>
            {searchTerm ? (
              <>
                <p>No assistants found for "{searchTerm}"</p>
                <p className='text-sm mt-1'>Try a different search term</p>
              </>
            ) : (
              <p>No assistants available</p>
            )}
          </div>
        )}
      </div>

      {/* Background overlay to prevent white space at bottom */}
      <div className='fixed bottom-0 left-0 right-0 h-20 bg-zinc-200 dark:bg-gray-900 lg:w-[20%] pointer-events-none z-0'></div>

      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger>
          <div className='fixed bottom-3 left-3 right-3 flex gap-3 items-center bg-gray-400 dark:bg-gray-700 px-3 py-2 rounded-2xl cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-600 lg:left-[6px] lg:right-auto lg:w-[calc(20%-0.75rem)] md:left-3 md:right-auto md:w-[calc(25%-0.75rem)] max-sm:w-[280px] z-10'>
            <UserButton afterSignOutUrl="/signin" />
            <div className='text-[14px]'>
              <p className='font-bold dark:text-gray-100'>
                {USER?.name}
              </p>
              <p className='text-gray-600 dark:text-gray-300 font-bold hover:text-pink-800 dark:hover:text-pink-400 cursor-pointer'>
                {USER?.orderId ? "Pro Plan" : "Free Plan"}
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-[200px] p-1 m-3 mb-16 md:mb-16 lg:mb-3'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer' onClick={() => {
            setDropdownOpen(false);
            setTimeout(() => setOpenDialog(true), 100);
            fetchData();
          }}> <UserCircle /> Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={signOFF} className='cursor-pointer'> <LogOut /> SignOut</DropdownMenuItem>
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
                <h2 className="font-semibold text-lg dark:text-gray-100">{user?.fullName || 'User'}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user?.primaryEmailAddress?.emailAddress || 'No email'}</p>
              </div>
            </div>
            <hr className='my-3'></hr>
            <div className='p-2 flex flex-col gap-2'>
              <h3 className='font-bold dark:text-gray-100'>Token Usage</h3>
              <Progress value={progress} />
              <span className='bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded-sm p-2'>{USER?.tokenUsed}/{USER?.credits}</span>
              <p className='flex p-1 items-center justify-between font-bold dark:text-gray-100'>Current Plan <span className='bg-gray-200 dark:bg-gray-700 dark:text-gray-100 p-2 text-sm rounded-md'>{USER?.orderId ? "Pro Plan" : "Free Plan"}</span></p>
            </div>
            <div className='p-4 border dark:border-gray-600 rounded-xl'>
              <div className='flex justify-between items-center  gap-1'>
                <div className='flex flex-col gap-1'>
                  <h2 className='font-bold text-lg dark:text-gray-100'>Pro Plan</h2>
                  <h2 className='dark:text-gray-300'>5,00000 Tokens</h2>
                </div>
                <h2 className='font-bold text-lg flex dark:text-gray-100'>&#8377;10</h2>
              </div>
              <hr className='my-3' />
              <CheckoutButton setrefresh={setrefresh} amount={10} />
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
