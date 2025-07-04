"use client"
import React, { useContext, useState } from 'react'
import { AssistantContext } from '@/context/AssistantContext'
import Image from 'next/image'

const AssistantSetting = () => {
    const {selectedAssistant,setselectedAssistant} = useContext(AssistantContext)
  return selectedAssistant &&(
    <div className='p-3 bg-secondary h-screen'>
      <h1 className='font-bold text-xl'>Settings</h1>
      <div className='mt-2 flex gap-2 items-center'>
        <Image src={selectedAssistant.image} alt='assistant' width={70} height={70} 
        className='rounded-xl'/>
        <div className='text-md'>
          <h1 className='font-bold'> {selectedAssistant.name} </h1>
          <h1 className='text-gray-700 dark:text-gray-300'> {selectedAssistant.title} </h1>
        </div>
      </div>
    </div>
  )
}

export default AssistantSetting
