"use client"
import React, { useContext, useEffect, useState } from 'react'
import EmptyChatState from './EmptyChatState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { useModel } from '@/context/ModelContext'
import { AssistantContext } from '@/context/AssistantContext'

const ChatUi = () => {
    
    
    const [input, setinput] = useState<string>()
    const { selectedModel } = useModel();
    const [showEmptyChatState, setshowEmptyChatState] = useState(true)
    const { selectedAssistant, setselectedAssistant } = useContext<any>(AssistantContext)
    useEffect(() => {
        setshowEmptyChatState(true)
    }, [selectedAssistant])
    
    const onSendMessage = async () => {
        setshowEmptyChatState(false)
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({prompt: input, model: selectedModel})
        });

        if (!res.ok) throw new Error("Failed to post");
        const data = await res.json();
        const ans = data.candidates[0].content.parts[0].text;
        console.log(ans);
    }

    return (
        <div className='p-20 relative h-[90vh] border-2'>
            {showEmptyChatState&&<EmptyChatState />}
            <div className='flex justify-between py-5 gap-5 absolute bottom-2 left-10 w-[90%]'>
                <Input placeholder='Start Typing Here.....' className='border-2 border-black'
                    onChange={(e) => setinput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSendMessage()
                        }
                    }} />
                <Button onClick={onSendMessage} className='cursor-pointer'>
                    <Send />
                </Button>
            </div>
        </div>
    )
}

export default ChatUi
