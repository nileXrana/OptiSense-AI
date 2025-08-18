import React from 'react'
import AssistantList from './_component/AssistantList'
import AssistantSetting from './_component/AssistantSetting'
import ChatUi from './_component/ChatUi'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const page = () => {
  return (
    <div className='h-screen w-full fixed'>
      {/* Header */}
      <header className="p-3 flex justify-between items-center border-b border-purple-100 dark:border-purple-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-3 ml-3">
            <div className="relative">
              {/* AI Assistant Robot Head */}
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
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
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              OptiSense AI
            </span>
          </div>
        </Link>
        
        <div className="flex items-center mr-3 gap-5">
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
      </header>

      <div className='grid grid-cols-5 h-[calc(100vh-88px)]'>
        <div className=''>
            <AssistantList/>
        </div>
        <div className='max-md:col-span-5 md:col-span-4 lg:col-span-3'>
            <ChatUi/>
        </div>
        <div className='max-lg:hidden'>
            <AssistantSetting/>
        </div>
      </div>
    </div>
  )
}

export default page
