"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className='border-2 border-white p-3 px-7 shadow-sm flex justify-between items-center'>
      <Image src={"/botlogo.png"} alt="Logo" width={50} height={50}>
      </Image>
      <div className='scale-120 transform hover:scale-150'>
        <UserButton />
      </div>
    </div>
  )
}

export default Header
