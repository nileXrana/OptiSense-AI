import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/AiAssistantsList'
import { BlurFade } from '@/src/components/magicui/blur-fade'
import { Checkbox } from '@radix-ui/react-checkbox'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Assistant } from 'next/font/google'
import { ASSISTANT } from '../../ai-assistants/page'
import { number } from 'motion/react'
import { Textarea } from '@/components/ui/textarea'
import AssistantAvatar from './AssistantAvatar'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs';

const AddNewAssistant = ({ children }: any) => {

    const { user } = useUser();
    // defaultAssistant :
    const DEFAULT_ASSISTANT = {
        image:'/bug-fixer.avif',
            name:'',
            title:'',
            instruction:'',
            id:0,
            sampleQuestions:[],
            userInstruction:'' ,
            uid: user?.id
    }
    // useState :
    const [selectedAssistant, setselectedAssistant] = useState<ASSISTANT>(DEFAULT_ASSISTANT)

    const onHandleInputChange = (field: string,value: string)=>{
        setselectedAssistant((prev:any)=>({
            ...prev,
            [field]:value
        }))
    }

    const onSave= async()=>{
        if(!selectedAssistant?.name || !selectedAssistant.title || !selectedAssistant.userInstruction){
            toast('please enter all details')
            return; 
        }
        // add it to backend :
        await fetch("/api/selected-assistants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([selectedAssistant])
    })
    .then(res => res.json())
  .then(resData => console.log(resData))
  .catch(err => console.error(err))
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Assistant</DialogTitle>
                    <DialogDescription asChild>
                        <div className='grid grid-cols-3 mt-5'>
                            <div className='border-r-2'>
                                <Button variant={'secondary'} size={'sm'} className='w-full mb-2 cursor-pointer hover:scale-108'
                                onClick={()=> setselectedAssistant(DEFAULT_ASSISTANT)}>+ Create New Assistant</Button>
                                <div className='overflow-y-auto h-[66vh]'>
                                    {AiAssistantsList.map((obj, index) => (
                                        <BlurFade key={obj.id} delay={0.25 + index * 0.1} inView>
                                            <div key={obj.id} className='hover:border-2 border-purple-400 hover:scale-101 transition-all ease-in-out cursor-pointer flex items-center p-2 ' onClick={()=>setselectedAssistant(obj)}>
                                                <Image src={obj.image} alt={obj.title} width={40} height={40} className='rounded-lg w-[40px] h-[40px] object-cover' />
                                                <h2 className='text-xs p-2 text-center text-gray-600 dark:text-gray-300'>{obj.title}</h2>
                                            </div>
                                        </BlurFade>
                                    ))}
                                </div>
                            </div>
                            <div className='col-span-2 ml-3'>
                                <div className='flex gap-5'>
                                    {selectedAssistant && 
                                    <AssistantAvatar selectedImage={(v: string)=>onHandleInputChange('image',v)}>
                                    <Image src={selectedAssistant?.image} alt='assistant' width={150} height={150} className='w-[100px] h-[100px] rounded-xl cursor-pointer object-cover' 
                                    />
                                    </AssistantAvatar>
                                    }
                                    <div className='flex flex-col gap-3'>
                                        <Input placeholder='Name of Assistant' className='w-full'
                                        value={selectedAssistant?.name}
                                         onChange={(event)=>onHandleInputChange('name',event.target.value)}/>
                                        <Input placeholder='Title of Assistant' className='w-full'
                                        value={selectedAssistant?.title}
                                        onChange={(event)=>onHandleInputChange('title',event.target.value)} 
                                        />
                                    </div>

                                </div>
                                <div className='mt-4'>

                                </div>
                                <div>
                                    <h2 className='text-gray-500 mb-2'>Instruction:</h2>
                                    <Textarea placeholder='Add Instruction'
                                    className='h-[200px]'
                                    value={selectedAssistant?.userInstruction}
                                    onChange={(event)=>onHandleInputChange('userInstruction',event.target.value)}
                                    />
                                </div>

                                <div className='flex gap-5 justify-end mt-5'>
                                    <Button>Cancel</Button>
                                    <Button onClick={onSave}>Add</Button>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewAssistant
