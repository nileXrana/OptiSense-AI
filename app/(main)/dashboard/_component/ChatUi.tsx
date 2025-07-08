"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import EmptyChatState from './EmptyChatState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { useModel } from '@/context/ModelContext'
import { AssistantContext } from '@/context/AssistantContext'
import Image from 'next/image'
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const ChatUi = () => {


    const [input, setinput] = useState<string>("")
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const { selectedModel } = useModel();
    const [showEmptyChatState, setshowEmptyChatState] = useState(true)
    const { selectedAssistant, setselectedAssistant } = useContext<any>(AssistantContext)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => { // when suddenly change assistant :
        setshowEmptyChatState(true)
        setMessages([])
    }, [selectedAssistant])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSendMessage = async () => {
        setshowEmptyChatState(false)
        // add user input to msg array :
        if (!input.trim()) return; // check if msg is empty
        setMessages((prev) => [...prev, { role: "user", text: input }]);
        setinput("")
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: selectedModel,
                instruction: selectedAssistant.instruction,
                userInstruction: selectedAssistant.userInstruction,
                input: input,
            })
        });
        if (!res.ok) throw new Error("Failed to post");
        const data = await res.json();
        // add AI response to msg array :
        const ans = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { role: "ai", text: ans }]);
    }

    return (
        <div className={showEmptyChatState ? "p-20 relative h-[90vh] border-2" : "p-3 relative h-[90vh] border-2"}>
            {showEmptyChatState ? <EmptyChatState /> :
                <div className='h-[88%] overflow-auto p-2'>
                    {messages.map((msg, idx) => (
                        <motion.div key={idx} className={msg.role === "user" ? " text-right m-3" : "text-left flex gap-3 items-start m-3"} initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}>
                            {/* <span className='w-10 h-10'> */}
                            {msg.role === "ai" && <Image className=' object-cover rounded-full' src={selectedAssistant.image} alt='assist' width={30} height={30} />}
                            {/* </span> */}
                            <span className={msg.role === "user" ? "bg-gray-200 inline-block p-2 px-3 rounded-lg min-w-[50px] text-left" : "bg-sky-200 nline-block p-2 px-3 rounded-lg min-w-[50px] text-left"}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>

                            </span>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
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
