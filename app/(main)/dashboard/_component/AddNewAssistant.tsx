"use client"
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
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AddNewAssistant = ({ children, onAssistantAdded }: any) => {

    const { user } = useUser();
    // defaultAssistant :
    const DEFAULT_ASSISTANT = {
        image:'/fitness4.png',
            name:'',
            title:'',
            instruction:'',
            id:0,
            sampleQuestions:[],
            userInstruction:'' ,
            uid: user?.id
    }
    const router = useRouter()
    // useState :
    const [selectedAssistant, setselectedAssistant] = useState<ASSISTANT>(DEFAULT_ASSISTANT)
    const [loading, setloading] = useState(false)
    const [open, setOpen] = useState(false)
    const [isDefaultAssistant, setIsDefaultAssistant] = useState(false)

    const onHandleInputChange = (field: string,value: string)=>{
        // console.log('onHandleInputChange called with field:', field, 'value:', value)
        setselectedAssistant((prev:any)=>{
            const newState = {
                ...prev,
                [field]:value
            }
            // console.log('New state after update:', newState)
            return newState
        })
    }

    const onSave= async()=>{
        if(!selectedAssistant?.name || !selectedAssistant.title || !selectedAssistant.userInstruction){
            toast('please enter all details')
            return; 
        }
        setloading(true)
        try {
            // add it to backend :
            const response = await fetch("/api/selected-assistants", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    assistants: [selectedAssistant],
                    userEmail: user?.primaryEmailAddress?.emailAddress
                })
            })
            
            const result = await response.json()
            
            if (response.ok && result.success) {
                toast.success('Assistant added successfully!')
                // Close the dialog
                setOpen(false)
                // Reset form
                setselectedAssistant(DEFAULT_ASSISTANT)
                // Notify parent component to refresh the list
                if (onAssistantAdded) {
                    onAssistantAdded()
                }
            } else if (response.status === 409 && result.error === "duplicate_name") {
                toast.error(result.message || 'Assistant with this name already exists')
            } else {
                toast.error(result.message || 'Failed to add assistant')
            }
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong')
        } finally {
            setloading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Add New Assistant</DialogTitle>
                    <DialogDescription asChild>
                        <div className='grid grid-cols-1 md:grid-cols-3 mt-3 sm:mt-5 gap-4 md:gap-0 max-h-[80vh] overflow-y-auto'>
                            <div className='md:border-r-2 border-b-2 md:border-b-0 pb-4 md:pb-0'>
                                <Button variant={'secondary'} size={'sm'} className='w-full mb-2 cursor-pointer hover:scale-108 text-xs sm:text-sm'
                                onClick={()=> {
                                    setselectedAssistant(DEFAULT_ASSISTANT)
                                    setIsDefaultAssistant(false)
                                }}>+ Create New Assistant</Button>
                                <div className='overflow-y-auto h-[25vh] sm:h-[30vh] md:h-[60vh]'>
                                    {AiAssistantsList.map((obj, index) => (
                                        <BlurFade key={obj.id} delay={0.25 + index * 0.1}>
                                            <div key={obj.id} className='bg-gray-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 m-1 rounded-lg transition-all ease-in-out cursor-pointer flex items-center p-1 sm:p-2' onClick={()=>{
                                                setselectedAssistant(obj)
                                                setIsDefaultAssistant(true)
                                            }}>
                                                <Image src={obj.image} alt={obj.title} width={35} height={35} className='rounded-lg object-cover sm:w-[40px] sm:h-[40px]' style={{ width: '35px', height: '35px' }} />
                                                <h2 className='text-[10px] sm:text-xs p-1 sm:p-2 text-gray-600 dark:text-gray-300'>{obj.title}</h2>
                                            </div>
                                        </BlurFade>
                                    ))}
                                </div>
                            </div>
                            <div className='md:col-span-2 md:ml-3'>
                                <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-5'>
                                    {selectedAssistant && 
                                    <AssistantAvatar selectedImage={(v: string)=>onHandleInputChange('image',v)}>
                                    <Image src={selectedAssistant?.image} alt='assistant' width={80} height={80} className='rounded-xl cursor-pointer object-cover mx-auto sm:mx-0 sm:w-[100px] sm:h-[100px]' style={{ width: '80px', height: '80px' }}
                                    />
                                    </AssistantAvatar>
                                    }
                                    <div className='flex flex-col gap-2 sm:gap-3 flex-1'>
                                        {isDefaultAssistant && (
                                            <p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>
                                                📋 Default assistant - Name and title cannot be changed
                                            </p>
                                        )}
                                        <Input 
                                            placeholder='Name of Assistant' 
                                            className={`w-full text-sm ${isDefaultAssistant ? 'opacity-60 cursor-not-allowed' : ''}`}
                                            value={selectedAssistant?.name}
                                            onChange={(event)=>onHandleInputChange('name',event.target.value)}
                                            disabled={isDefaultAssistant}
                                        />
                                        <Input 
                                            placeholder='Title of Assistant' 
                                            className={`w-full text-sm ${isDefaultAssistant ? 'opacity-60 cursor-not-allowed' : ''}`}
                                            value={selectedAssistant?.title}
                                            onChange={(event)=>onHandleInputChange('title',event.target.value)}
                                            disabled={isDefaultAssistant}
                                        />
                                    </div>

                                </div>
                                <div className='mt-2 sm:mt-4'>

                                </div>
                                <div>
                                    <h2 className='text-gray-500 mb-1 sm:mb-2 text-sm'>Instruction:</h2>
                                    <Textarea placeholder='Add Instruction'
                                    className='h-[100px] sm:h-[150px] md:h-[180px] text-sm'
                                    value={selectedAssistant?.userInstruction}
                                    onChange={(event)=>onHandleInputChange('userInstruction',event.target.value)}
                                    />
                                </div>

                                <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-5 justify-end mt-3 sm:mt-5'>
                    
                                    <Button className='cursor-pointer w-full sm:w-auto text-sm' disabled={loading} onClick={onSave}>{loading?<Loader2Icon className='animate-spin w-4 h-4'/>:<div>Add</div>}</Button>
                                    
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
