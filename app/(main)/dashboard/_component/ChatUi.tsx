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

interface ChatUiProps {
  setUSER?: (user: any) => void
}

const ChatUi = ({ setUSER }: ChatUiProps) => {

    const { user,isSignedIn } = useUser();
    const [input, setInput] = useState<string>("")
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const { selectedModel } = useModel();
    const [ showEmptyChatState, setshowEmptyChatState] = useState(true)
    const { selectedAssistant, setselectedAssistant } = useContext<any>(AssistantContext)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isLoading, setisLoading] = useState(false)
    const [tokenExceeded, settokenExceeded] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Handle hydration
    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle mobile keyboard scroll on input focus
    const handleInputFocus = () => {
        // Check if device is mobile (max-sm) and has touch capability
        const isMobile = window.innerWidth <= 640 && ('ontouchstart' in window);
        if (isMobile) {
            // Multiple attempts with different delays to ensure it works
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 100);
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 300);
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 600);
        }
    }

    // Additional handler for when virtual keyboard resizes the viewport
    useEffect(() => {
        if (!mounted) return;

        const handleResize = () => {
            if (window.innerWidth <= 640 && document.activeElement?.tagName === 'INPUT') {
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
                }, 100);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mounted]);

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
                conversationHistory: messages // Send conversation history for context
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
        
        // update USER.credits & tokenUsed
        if(setUSER){
            if(tokenExceeded){
                // update : tokenUsed = credits
                setUSER((prevUser:any)=>{
                    if(!prevUser) return prevUser;
                    return {
                        ...prevUser,
                        tokenUsed: prevUser.credits
                    }
                })
            }else{
                // update : tokenUsed = result.tokenUsed
                setUSER((prevUser:any)=>{
                    if(!prevUser) return prevUser;
                    return {
                        ...prevUser,
                        tokenUsed: result.tokenUsed
                    }
                })
            }
        }

    }

    useEffect(() => {
        if (!mounted) return;
        
        const checkTokenStatus = async () => {
            if(!user) return;
            const email = user.primaryEmailAddress?.emailAddress;
            try {
                const res = await fetch("/api/updateToken", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: email,
                        tokenCount: 0
                    })
                });

                const result = await res.json();
                settokenExceeded(result.tE);
            } catch (error) {
                console.error('Error checking token status:', error);
            }
        };

        checkTokenStatus();
    }, [mounted, user]) // v imp :
    
    // Prevent hydration mismatch
    if (!mounted) {
        return <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
    }

    return (
        <div className={showEmptyChatState ? "p-4 pt-16 md:p-20 h-full border-2 relative" : "p-3 pl-0 max-sm:pr-0 relative h-[91vh] border-2 bg-[url('/wall40.png')] dark:bg-[url('/wall5.jpg')] bg-cover bg-center"}>
            {showEmptyChatState ? <EmptyChatState input={input} setInput={setInput} onSendMessage={onSendMessage}/> :
                <div className='h-[80vh] max-sm:h-[75vh] relative overflow-y-auto overflow-x-hidden p-2 max-sm:p-0'>
                    {messages.map((msg, idx) => (
                        <motion.div key={idx} className={msg.role === "user" ? "text-right m-3 max-w-full" : "text-left flex gap-3 items-start m-3 max-w-full"} initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}>
                            {/* <span className='w-10 h-10'> */}
                            {msg.role === "ai" && <Image className='max-sm:hidden object-cover rounded-full flex-shrink-0' src={selectedAssistant.image} alt='assist' width={30} height={30} style={{ width: '30px', height: '30px' }} />}
                            {/* </span> */}
                            <div className={msg.role === "user" ? "bg-green-200 dark:bg-green-800 dark:text-green-100 inline-block p-2 px-3 rounded-lg min-w-[50px] max-w-[85%] text-left shadow-black shadow-xs break-words overflow-wrap-anywhere" : "bg-blue-200 dark:bg-blue-800 dark:text-blue-100 inline-block p-2 px-3 rounded-lg min-w-[50px] max-w-[calc(100%-3rem)] max-sm:max-w-[calc(100%-1rem)] text-left shadow-md shadow-black overflow-x-auto overflow-wrap-anywhere"}>
                                <div className="prose prose-sm max-w-none break-words whitespace-pre-wrap">
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                            </div>
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
            <div className='flex justify-between gap-5 fixed bottom-6 max-sm:bottom-2 left-4 right-4 scale-96 lg:left-[calc(20%+1rem)] lg:right-[calc(20%+1rem)] md:left-[calc(25%+1rem)] md:right-4'>
                <Input value={input} placeholder='Start Typing Here...' className='border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 font-serif font-medium'
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={handleInputFocus}
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
