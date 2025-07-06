"use client"
import React, { useContext } from 'react'
import { SparklesText } from '@/src/components/magicui/sparkles-text'
import { AssistantContext } from '@/context/AssistantContext'

const EmptyChatState = () => {

    const { selectedAssistant, setselectedAssistant } = useContext<any>(AssistantContext)
    const sampleQuestions: string[] = selectedAssistant?.sampleQuestions

    return (
        <div>
            <div className='text-center'>
                <SparklesText className='text-4xl'>
                    How Can I Assist You Today ?
                </SparklesText>
            </div>
            <div className='flex flex-col gap-1 items-center mt-5'>
                {sampleQuestions && sampleQuestions.map((ele:string,idx: number)=>(
                    <div key={ele} className='text-center text-lg w-[85%] border-2 py-2 rounded-lg'>
                        {ele}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default EmptyChatState
