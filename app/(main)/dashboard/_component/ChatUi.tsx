"use client"
import React, { useState } from 'react'
import EmptyChatState from './EmptyChatState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

const ChatUi = () => {

    const [input, setinput] = useState<string>()

    const onSendMessage = ()=>{
        
    }

    return (
        <div className='p-20 relative h-[90vh] border-2'>
            <EmptyChatState />
            <div className='flex justify-between py-5 gap-5 absolute bottom-2 left-10 w-[90%]'>
                <Input placeholder='Start Typing Here.....' className='border-2 border-black'
                    onChange={(e) => setinput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSendMessage()
                        }
                    }} />
                <Button>
                    <Send />
                </Button>
            </div>
        </div>
    )
}

export default ChatUi
