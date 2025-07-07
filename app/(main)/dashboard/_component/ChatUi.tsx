"use client"
import React, { useContext, useEffect, useState } from 'react'
import EmptyChatState from './EmptyChatState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { useModel } from '@/context/ModelContext'
import { AssistantContext } from '@/context/AssistantContext'

const ChatUi = () => {


    const [input, setinput] = useState<string>("")
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const { selectedModel } = useModel();
    const [showEmptyChatState, setshowEmptyChatState] = useState(true)
    const { selectedAssistant, setselectedAssistant } = useContext<any>(AssistantContext)
    useEffect(() => {
        setshowEmptyChatState(true)
    }, [selectedAssistant])

    const onSendMessage = async () => {
        setshowEmptyChatState(false)
        // add user input to msg array :
        if (!input.trim()) return; // check if msg is empty
        setMessages((prev) => [...prev, { role: "user", text: input }]);
        setinput("")
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: input, model: selectedModel })
        });
        if (!res.ok) throw new Error("Failed to post");
        const data = await res.json();
        // add AI response to msg array :
        const ans = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { role: "ai", text: ans }]);
    }

    return (
        <div className='p-20 relative h-[90vh] border-2'>
            {showEmptyChatState ? <EmptyChatState /> :
                <div>
                    {messages.map((msg, idx) => (
                        <p key={idx} className={msg.role === "user" ? "text-blue-600 text-right" : "text-green-600 text-left"}>
                            <strong>{msg.role}:</strong> {msg.text}
                        </p>
                    ))}
                </div>
            }
            <div className='flex justify-between py-5 gap-5 absolute bottom-2 left-10 w-[90%]'>
                <Input value={input} placeholder='Start Typing Here.....' className='border-2 border-black'
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
