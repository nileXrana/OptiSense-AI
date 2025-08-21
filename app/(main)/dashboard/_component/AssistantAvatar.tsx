import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'

const AssistantAvatar = ({children,selectedImage}: any) => {
    const [open, setOpen] = useState(false)
    
    const handleImageSelect = (imageUrl: string) => {
        selectedImage(imageUrl)
        setOpen(false)
    }
    
    return (
        <div className="relative">
            <div onClick={() => setOpen(!open)}>
                {children}
            </div>
            
            {open && (
                <div className="absolute top-full left-0 mt-2 w-80 p-4 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">
                    <p className="text-sm mb-2">Select an avatar ({AiAssistantsList.length} available):</p>
                    <div className='grid grid-cols-5 gap-3'>
                        {AiAssistantsList.map((obj,idx)=>(
                            <button 
                                key={idx}
                                type="button"
                                className='w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-purple-400 transition-all duration-200 overflow-hidden bg-white'
                                onClick={() => handleImageSelect(obj.image)}
                            >
                                <img 
                                    src={obj.image} 
                                    alt={obj.name} 
                                    className='w-full h-full object-cover rounded-md'
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AssistantAvatar
