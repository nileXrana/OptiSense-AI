import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'

const AssistantAvatar = ({children,selectedImage}: any) => {
    return (
        <Popover>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                <div className='grid grid-cols-5 gap-5'>
                    {AiAssistantsList.map((obj,idx)=>(
                        <Image src={obj.image} alt={obj.name} width={80} height={80}
                        key={idx}
                        className='w-[40px] h-[40px] rounded-lg object-cover cursor-pointer' 
                        onClick={()=>selectedImage(obj.image)}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default AssistantAvatar
