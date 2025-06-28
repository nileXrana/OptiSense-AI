'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from 'react'

export type ASSISTANT = {
  id: number,
  name: string,
  title: string,
  image: string,
  instruction: string,
  userInstruction: string,
  sampleQuestions: string[]
}

const page = () => {
  const [selectedAssistants, setselectedAssistants] = useState<ASSISTANT[]>([]);
  const onselect = (obj: ASSISTANT) => {
    const item = selectedAssistants.find((object: ASSISTANT) => object.id == obj.id);
    if(item){
      setselectedAssistants(selectedAssistants.filter ((item:ASSISTANT)=>item.id!==obj.id))
      return;
    }
    setselectedAssistants(prev => [...prev, obj]);
  }
  const IsAssistantSelected = (obj: ASSISTANT)=>{
    const item = selectedAssistants.find((object: ASSISTANT) => object.id == obj.id);
    return item?true:false
  }

  return (
    <div className='px-10 mt-20 md:px-28 lg:px-36 xl:px-48'> 
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-3xl font-bold'>Welcome to the World of AI Assistants 🤖</h2>
          <p className='text-xl mt-2'>Choose your AI Campanion to Simplify Your Tasks 🚀</p>
        </div>
        <Button>Continue</Button>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-5 mb-10'>
        {AiAssistantsList.map((obj) => (
          <div key={obj.id} className='hover:border hover:scale-115 transition-all ease-in-out cursor-pointer' onClick={() => onselect(obj)}>
            <Checkbox className='absolute m-2' checked={IsAssistantSelected(obj)}/>
            <Image src={obj.image} alt={obj.title} width={300} height={300} className='rounded-xl w-full h-[200px] object-cover' />
            <h2 className='text-center font-bold text-lg'>{obj.name}</h2>
            <h2 className='text-center text-gray-600 dark:text-gray-300'>{obj.title}</h2>
          </div>
        ))}
      </div>

    </div>
  )
}

export default page
