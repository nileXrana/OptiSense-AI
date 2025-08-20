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
                        <Image src={obj.image} alt={obj.name} width={40} height={40}
                        key={idx}
                        className='rounded-lg object-cover cursor-pointer' 
                        style={{ width: '40px', height: '40px' }}
                        onClick={()=>selectedImage(obj.image)}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default AssistantAvatar
