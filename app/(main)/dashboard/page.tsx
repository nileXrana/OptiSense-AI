"use client"
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import AssistantList from './_component/AssistantList'
import AssistantSetting from './_component/AssistantSetting'
import ChatUi from './_component/ChatUi'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { VscSettingsGear } from "react-icons/vsc";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { AssistantContext } from '@/context/AssistantContext'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const page = () => {

  const [showSettings, setShowSettings] = useState(false)
  const [showAssistantList, setShowAssistantList] = useState(false)
  const [myAssistants, setMyAssistants] = useState([])
  const [initialUserData, setInitialUserData] = useState(null)
  const [USER, setUSER] = useState<any>() // Lifted from AssistantList
  const [mounted, setMounted] = useState(false)
  const [isLoadingAssistants, setIsLoadingAssistants] = useState(true)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)
  const { setselectedAssistant } = useContext(AssistantContext)
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check authentication when component mounts and user data is loaded
  useEffect(() => {
    if (mounted && isLoaded) {
      if (!isSignedIn) {
        alert("Sign In First !")
        router.push('/signin')
        return
      }
    }
  }, [mounted, isLoaded, isSignedIn, router])

  // Load assistants immediately when dashboard loads
  useEffect(() => {
    if (!mounted || !isSignedIn || !isLoaded || !user?.primaryEmailAddress?.emailAddress) return

    loadAssistants();
  }, [mounted, isSignedIn, isLoaded, user])

  // Function to reload assistants (to be called when new assistant is added)
  const loadAssistants = async () => {
    setIsLoadingAssistants(true)
    try {
      const res = await fetch("/api/is-selected", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user?.primaryEmailAddress?.emailAddress
        })
      });
      const result = await res.json();
      if (result && result.length > 0) {
        setMyAssistants(result)
        if (!result.find((assistant: any) => assistant.id === result[0].id)) {
          setselectedAssistant(result[0])
        }
      }
    } catch (error) {
      console.error("Error loading assistants:", error);
    } finally {
      setIsLoadingAssistants(false)
    }
  }  // Load initial user data once when dashboard loads
  useEffect(() => {
    if (!mounted || !isSignedIn || !user?.primaryEmailAddress?.emailAddress) return;

    setIsLoadingUserData(true)
    const loadInitialUserData = async () => {
      try {
        const res = await fetch('/api/save-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.primaryEmailAddress!.emailAddress,
          })
        });
        const result = await res.json();
        setInitialUserData(result);
        setUSER(result); // Also set the USER state
      } catch (error) {
        console.error("Error loading initial user data:", error);
      } finally {
        setIsLoadingUserData(false)
      }
    }

    loadInitialUserData();
  }, [mounted, isSignedIn, user])

  // Prevent hydration mismatch by not rendering until mounted and user loaded
  if (!mounted || !isLoaded) {
    return <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  }

  // If user is not signed in, show loading while redirecting
  if (!isSignedIn) {
    return <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  }

  // Show loading interface while fetching assistants and user data
  if (isLoadingAssistants || isLoadingUserData) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white animate-pulse">
              Your Assistants Are On The Way!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              We&apos;re Preparing Your Personalized AI Experience...
            </p>
            <div className="flex justify-center space-x-1 mt-4">
              <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='h-screen w-full fixed'>
      {/* Header */}
      <header className="p-3 flex justify-between items-center border-b border-purple-100 dark:border-purple-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-3 ml-3">
            <div className="relative">
              {/* AI Assistant Robot Head */}
              <div className="max-sm:scale-90 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                  {/* Robot eyes - more expressive */}
                  <div className="flex gap-1.5 mb-1">
                    <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
                    </div>
                    <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
                    </div>
                  </div>
                  {/* Robot mouth - friendly smile */}
                  <div className="w-4 h-1 bg-white rounded-full relative">
                    <div className="absolute inset-0 bg-white rounded-full transform scale-y-50"></div>
                  </div>
                </div>
              </div>
              {/* Assistant indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <span className="max-sm:hidden max-sm:text-sm text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              OptiSense AI
            </span>
          </div>
        </Link>

        <div className="flex items-center ml-5 mr-3 max-sm:w-full max-sm:justify-between gap-5">
          {/* Menu button for mobile */}
          <div className="flex gap-6">
            {/* Settings button for tablets and mobile */}
            <VscSettingsGear
              className='block lg:hidden cursor-pointer text-xl hover:text-purple-600 transition-colors'
              onClick={() => setShowSettings(!showSettings)}
            />
            <HiOutlineMenuAlt3
              className='block md:hidden cursor-pointer text-xl hover:text-purple-600 transition-colors'
              onClick={() => {
                setShowAssistantList(!showAssistantList)
                // Refresh assistants when opening mobile list
                if (!showAssistantList) {
                  loadAssistants()
                }
              }}
            />
          </div>

          <div className='flex gap-6'>
            <ModeToggle />
            <div className='scale-110 transform hover:scale-120 flex items-center'>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-15 h-15"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className='relative h-[calc(100vh-88px)]'>
        {/* Desktop Layout */}
        <div className='hidden lg:grid lg:grid-cols-5 h-full'>
          <div className=''>
            <AssistantList
              preloadedAssistants={myAssistants}
              initialUserData={initialUserData}
              USER={USER}
              setUSER={setUSER}
              onAssistantsUpdated={loadAssistants}
            />
          </div>
          <div className='col-span-3'>
            <ChatUi setUSER={setUSER} />
          </div>
          <div className=''>
            <AssistantSetting />
          </div>
        </div>

        {/* Tablet Layout */}
        <div className='hidden md:grid lg:hidden md:grid-cols-4 h-full'>
          <div className=''>
            <AssistantList
              preloadedAssistants={myAssistants}
              initialUserData={initialUserData}
              USER={USER}
              setUSER={setUSER}
              onAssistantsUpdated={loadAssistants}
            />
          </div>
          <div className='col-span-3'>
            <ChatUi setUSER={setUSER} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='block md:hidden h-full'>
          <ChatUi setUSER={setUSER} />
        </div>

        {/* Mobile Assistant List Overlay */}
        {showAssistantList && (
          <div className='fixed inset-0 z-50 md:hidden'>
            <div className='absolute inset-0 bg-black/50' onClick={() => setShowAssistantList(false)}></div>
            <div className='absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-xl'>
              <div className='flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700'>
                <h2 className='text-lg font-semibold dark:text-gray-100'>AI Assistants</h2>
                <IoClose
                  className='text-2xl cursor-pointer hover:text-red-500 transition-colors dark:text-gray-100'
                  onClick={() => setShowAssistantList(false)}
                />
              </div>
              <div className='h-[calc(100vh-120px)] overflow-hidden'>
                <AssistantList
                  preloadedAssistants={myAssistants}
                  initialUserData={initialUserData}
                  USER={USER}
                  setUSER={setUSER}
                  onMobileClose={() => setShowAssistantList(false)}
                  onAssistantsUpdated={loadAssistants}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile & Tablet Settings Overlay */}
        {showSettings && (
          <div className='fixed inset-0 z-50 block lg:hidden'>
            <div className='absolute inset-0 bg-black/50' onClick={() => setShowSettings(false)}></div>
            <div className='absolute right-0 top-0 bottom-0 w-full md:w-80 bg-white dark:bg-gray-900 shadow-xl'>
              <div className='flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700'>
                <h2 className='text-lg font-semibold dark:text-gray-100'>Assistant Settings</h2>
                <IoClose
                  className='text-2xl cursor-pointer hover:text-red-500 transition-colors dark:text-gray-100'
                  onClick={() => setShowSettings(false)}
                />
              </div>
              <div className='h-[calc(100vh-120px)] overflow-hidden'>
                <AssistantSetting />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
