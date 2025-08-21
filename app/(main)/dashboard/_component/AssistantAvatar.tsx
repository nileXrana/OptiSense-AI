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
                <div className="absolute top-full left-0 mt-2 w-80 max-h-96 p-4 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-sm font-medium">Select an avatar</p>
                        <button 
                            onClick={() => setOpen(false)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                        {AiAssistantsList.length} assistants available
                    </div>
                    <div className='grid grid-cols-6 gap-2 max-h-72 overflow-y-auto pr-2'>
                        {AiAssistantsList.map((obj,idx)=>(
                            <button 
                                key={idx}
                                type="button"
                                className='w-10 h-10 rounded-lg border border-gray-200 hover:border-purple-400 hover:scale-110 transition-all duration-200 overflow-hidden bg-white group'
                                onClick={() => handleImageSelect(obj.image)}
                                title={obj.name}
                            >
                                <img 
                                    src={obj.image} 
                                    alt={obj.name} 
                                    className='w-full h-full object-cover rounded-md group-hover:brightness-110'
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
