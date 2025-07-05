"use client"
import React, { useContext, useState } from 'react'
import { AssistantContext } from '@/context/AssistantContext'
import Image from 'next/image'
import { Trash } from 'lucide-react'
import { Save } from 'lucide-react'
import { Loader2, Loader2Icon } from 'lucide-react'
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { Ghost } from 'lucide-react'
import { useEffect } from 'react'
import ConfirmationAlert from './ConfirmationAlert'

const AssistantSetting = () => {
  // useState, useContext and useEffect :
  const { selectedAssistant, setselectedAssistant } = useContext(AssistantContext)
  const [text, settext] = useState<string>()
  const [loading, setloading] = useState(false)

  const onDelete = async() => { // delete assistant
    try {
      const res = await fetch("/api/delete-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: selectedAssistant?.id }),
      });
      const data = await res.json();
      toast("Assistant Deleted")
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function saveIt() { // saves the instructions of AI to backend
    try {
      setloading(true)
      const res = await fetch("/api/user-instruct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instruction: text, id: selectedAssistant?.id }),
      });
      const data = await res.json();
      setloading(false)
      toast("Saved Successfully")
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    settext(selectedAssistant?.userInstruction)
  }, [selectedAssistant])

  const handleChange = (e: string) => {
    settext(e)
  }

  return selectedAssistant && (
    <div className='p-3 bg-secondary h-screen relative'>
      <h1 className='font-bold text-xl'>Settings</h1>
      <div className='mt-4 flex gap-2 items-center bg-white p-2 rounded-2xl'>
        <Image src={selectedAssistant.image} alt='assistant' width={70} height={70}
          className='rounded-xl' />
        <div className='text-md'>
          <h1 className='font-bold'> {selectedAssistant.name} </h1>
          <h1 className='text-gray-700 dark:text-gray-300'> {selectedAssistant.title} </h1>
        </div>
      </div>
      <div className='mt-3'>
        <h2 className='mb-1 font-bold text-gray-600'>Model : </h2>
        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Google Gemini" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flash">Gemini 2.5 Flash</SelectItem>
            <SelectItem value="pro">Gemini 2.5 Pro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='mt-3'>
        <h2 className='text-gray-600 font-bold'>Instruction : </h2>
        <Textarea placeholder='Add Instruction' value={text} className='text-gray-600 h-[300px] bg-white' onChange={(e) => handleChange(e.target.value)} />
      </div>
      <div className='w-full absolute bottom-25 flex gap-10 justify-center items-center'>
        <ConfirmationAlert onDelete={onDelete}>
          {/* <Button disabled={loading} variant="ghost" className='cursor-pointer'> <Trash /> Delete</Button> */}
          <div className='flex text-sm scale-114 mt-1 cursor-pointer'>
            <Trash />
          </div>
        </ConfirmationAlert>
        <Button disabled={loading} onClick={saveIt} className='cursor-pointer'> {loading ? <Loader2Icon className='animate-spin' /> : <Save />}  Save</Button>
      </div>
    </div>
  )
}

export default AssistantSetting
