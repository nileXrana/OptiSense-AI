import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import UserLogger from '@/components/userLogger' // to get user details :

const page = () => {
  return (
    <ClerkProvider>
      <div className='h-[100vh] border-2 m-auto flex items-center'>
        <div className='w-[50%] border-2 m-auto flex flex-col gap-3 justify-center items-center h-[60%] '>
          <Image
            src="/botlogo.png"
            alt="Logo"
            width={150}
            height={150}
          />
          <div className='font-bold text-2xl'>
            Sign In to your Personal AI Assistance
          </div>
          <div className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
            <UserButton/>
            </SignedIn>
          </div>
        </div>
      </div>
    <UserLogger/>
    </ClerkProvider>

  )
}

export default page
