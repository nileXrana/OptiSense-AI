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
import { BlurFade } from '@/src/components/magicui/blur-fade'
import { useModel } from '@/context/ModelContext'

const AssistantSetting = () => {
  // useState, useContext and useEffect :
  const { selectedAssistant, setselectedAssistant } = useContext(AssistantContext)
  const [text, settext] = useState<string>()
  const [loading, setloading] = useState(false)
  const { selectedModel, setSelectedModel } = useModel();

  const onDelete = async() => { // delete assistant
    try {
      setloading(true)
      const res = await fetch("/api/delete-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name: selectedAssistant?.name }),
      });
      const data = await res.json();
      setloading(false)
      toast("Assistant Deleted")
      window.location.reload(); // reload :
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
        body: JSON.stringify({ instruction: text, name: selectedAssistant?.name }),
      });
      const data = await res.json();
      setloading(false)
      toast("Saved Successfully")
      window.location.reload(); // reload :
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
    <div className='p-3 dark:bg-gray-900 bg-zinc-200 h-screen relative '>
      <BlurFade duration={0.4}>
      <h1 className='font-bold text-xl pl-1 dark:text-gray-200'>Setting</h1>
      </BlurFade>
      <BlurFade duration={0.6}>
      <div className='mt-4 flex gap-2 items-center bg-white dark:bg-gray-800 dark:border p-2 rounded-2xl'>
        <Image src={selectedAssistant.image} alt='assistant' width={70} height={70}
          className='rounded-xl' />
        <div className='text-md'>
          <h1 className='font-bold'> {selectedAssistant.name} </h1>
          <h1 className='text-gray-700 dark:text-gray-300'> {selectedAssistant.title} </h1>
        </div>
      </div>
      </BlurFade>
      <BlurFade duration={0.8}>
      <div className='mt-3'>
        <h2 className='mb-1 font-bold text-gray-600 dark:text-gray-200 pl-1'>Model : </h2>
        <Select onValueChange={(value) => setSelectedModel(value)}>
          <SelectTrigger className="w-full bg-white">
            <Image src={"/google.png"} alt='google' width={20} height={20}/>
            <SelectValue placeholder="Google Gemini" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flash">Gemini 2.5 Flash</SelectItem>
            <SelectItem value="pro">Gemini 2.5 Pro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      </BlurFade>
      <BlurFade duration={0.8}>
      <div className='mt-3'>
        <h2 className='text-gray-600 dark:text-gray-200 mb-1 font-bold'>Instruction : </h2>
        <Textarea placeholder='Add Instruction' value={text} className='text-gray-600 dark:text-gray-200 h-[280px] bg-white' onChange={(e) => handleChange(e.target.value)} />
      </div>
      </BlurFade>
      <div style={{ width: 'calc(100vw / 5)' }} className=' fixed bottom-3 flex gap-10 items-center justify-center-safe right-0 scale-90 px-3 py-2 w-[92%]'>
        <ConfirmationAlert onDelete={onDelete}>
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
