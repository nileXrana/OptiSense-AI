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
import { RotatingLines } from 'react-loader-spinner';
import { Loader2 } from "lucide-react"
import { useUser } from '@clerk/nextjs'

const ChatUi = () => {

    const { user } = useUser();
    const [input, setInput] = useState<string>("")
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const { selectedModel } = useModel();
    const [ showEmptyChatState, setshowEmptyChatState] = useState(true)
    const { selectedAssistant, setselectedAssistant } = useContext<any>(AssistantContext)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isLoading, setisLoading] = useState(false)
    const [tokenExceeded, settokenExceeded] = useState(false)
    useEffect(() => { // when suddenly change assistant :
        setshowEmptyChatState(true)
        setMessages([])
    }, [selectedAssistant])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSendMessage = async (sampleQues?: string) => {
        setshowEmptyChatState(false)
        // check if user exceed limit :
        if(tokenExceeded){
            setInput("")
            alert("token exceeded ! Updrade to pro plan !")
            return;
        }
        // add user input to msg array :
        const message = sampleQues ?? input;
        if (!message.trim()) return;; // check if msg is empty
        setMessages((prev) => [...prev, { role: "user", text: message }]);
        setInput("")
        setisLoading(true)
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
        setisLoading(false)
        // add AI response to msg array :
        const ans = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { role: "ai", text: ans }]);
        updateUserToken(ans)
    }

    const updateUserToken = async(resp: string)=>{
        const tokenCount = resp.trim() ? resp.trim().split(/\s+/).length : 0
        if(!user) return null // not signIn :
        const email = user.primaryEmailAddress?.emailAddress;
        // now update tokenUsed :
        const res = await fetch("/api/updateToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                tokenCount : tokenCount
            })
        });
        // check tokenExceeded :
        const result = await res.json()
        settokenExceeded(result.tE)

    }

    useEffect(() => {
        const checkTokenStatus = async () => {
            if (!user?.primaryEmailAddress?.emailAddress) return;
            
            try {
                const res = await fetch("/api/updateToken", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: user.primaryEmailAddress.emailAddress,
                        tokenCount: 0
                    })
                });

                if (!res.ok) {
                    throw new Error('Failed to check token status');
                }

                const result = await res.json();
                console.log(result);
                settokenExceeded(result.tE);
            } catch (error) {
                console.error('Error checking token status:', error);
            }
        };

        checkTokenStatus();
    }, [user]) // v imp :
    

    return (
        <div className={showEmptyChatState ? "p-20 h-full border-2 relative" : "p-3 pl-0 relative h-[91vh] border-2 bg-[url('/wall40.png')] dark:bg-[url('/wall5.jpg')] bg-cover bg-center"}>
            {showEmptyChatState ? <EmptyChatState input={input} setInput={setInput} onSendMessage={onSendMessage}/> :
                <div style={{height: 'calc(100%-70px)'}} className='bg-green-200 relative overflow-auto p-2'>
                    {messages.map((msg, idx) => (
                        <motion.div key={idx} className={msg.role === "user" ? " text-right m-3" : "text-left flex gap-3 items-start m-3"} initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}>
                            {/* <span className='w-10 h-10'> */}
                            {msg.role === "ai" && <Image className=' object-cover rounded-full' src={selectedAssistant.image} alt='assist' width={30} height={30} />}
                            {/* </span> */}
                            <span className={msg.role === "user" ? "bg-green-200 dark:bg-green-800 dark:text-green-100 inline-block p-2 px-3 rounded-lg min-w-[50px] text-left shadow-black shadow-xs" : "bg-sky-200 dark:bg-blue-500 dark:text-blue-100 inline-block p-2 px-3 rounded-lg min-w-[50px] text-left shadow-md shadow-black"}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>

                            </span>
                        </motion.div>
                    ))}
                    {isLoading && 
                        <div className='ml-3'>
                            <Loader2 className="mr-2 h-7 w-7 animate-spin text-gray-600 dark:text-gray-300" />
                        </div>
                    }
                    <div ref={messagesEndRef} />
                </div>
            }
            <div style={{width: 'calc(100vw/5*3)', left: 'calc(100vw/5'}} className='flex justify-between gap-5 fixed bottom-6 scale-90'>
                <Input value={input} placeholder='Start Typing Here...' className='border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSendMessage()
                        }
                    }} />
                <Button onClick={()=>{
                    onSendMessage()
                }} className='cursor-pointer block '>
                    <Send />
                </Button>
            </div>
        </div>
    )
}

export default ChatUi
