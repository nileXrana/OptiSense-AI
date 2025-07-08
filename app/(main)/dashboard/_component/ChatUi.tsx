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


    const [input, setInput] = useState<string>("")
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

    const onSendMessage = async (sampleQues?: string) => {
        setshowEmptyChatState(false)
        // add user input to msg array :
        const message = sampleQues ?? input;
        if (!message.trim()) return;; // check if msg is empty
        setMessages((prev) => [...prev, { role: "user", text: message }]);
        setInput("")
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: selectedModel,
                instruction: selectedAssistant.instruction,
                userInstruction: selectedAssistant.userInstruction,
                input: message,
            })
        });
        if (!res.ok) throw new Error("Failed to post");
        const data = await res.json();
        // add AI response to msg array :
        const ans = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { role: "ai", text: ans }]);
    }

    return (
        <div className={showEmptyChatState ? "p-20 relative h-[90vh] border-2 bg" : "p-3 pl-0 relative h-[90vh] border-2 bg-[url('/wall6.jpg')] bg-cover bg-center"}>
            {showEmptyChatState ? <EmptyChatState input={input} setInput={setInput} onSendMessage={onSendMessage}/> :
                <div className='h-[88%] overflow-auto p-2'>
                    {messages.map((msg, idx) => (
                        <motion.div key={idx} className={msg.role === "user" ? " text-right m-3" : "text-left flex gap-3 items-start m-3"} initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}>
                            {/* <span className='w-10 h-10'> */}
                            {msg.role === "ai" && <Image className=' object-cover rounded-full' src={selectedAssistant.image} alt='assist' width={30} height={30} />}
                            {/* </span> */}
                            <span className={msg.role === "user" ? "bg-green-100 inline-block p-2 px-3 rounded-lg min-w-[50px] text-left shadow-black shadow-xs" : "bg-sky-100 nline-block p-2 px-3 rounded-lg min-w-[50px] text-left shadow-md shadow-black"}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>

                            </span>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            }
            <div className='flex justify-between py-5 gap-5 absolute bottom-2 left-10 w-[90%]'>
                <Input value={input} placeholder='Start Typing Here.....' className='border-2 border-black bg-white'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSendMessage()
                        }
                    }} />
                <Button onClick={()=>{
                    onSendMessage()
                }} className='cursor-pointer'>
                    <Send />
                </Button>
            </div>
        </div>
    )
}

export default ChatUi
