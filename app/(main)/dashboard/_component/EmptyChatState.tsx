"use client"
import React, { useContext } from 'react'
import { SparklesText } from '@/src/components/magicui/sparkles-text'
import { AssistantContext } from '@/context/AssistantContext'
import { ChevronRight } from 'lucide-react'
import { BlurFade } from '@/src/components/magicui/blur-fade'

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

const EmptyChatState = ({ input, setInput }: Props) => {

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
                    <div key={ele} className='text-center text-lg border-2 p-3 rounded-lg hover:bg-gray-200 cursor-pointer flex justify-between items-center w-[90%]'>
                        <BlurFade duration={0.5*idx} blur='5px' key={idx}>
                        {ele}
                    </BlurFade>
                        <ChevronRight className='scale-115'/>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default EmptyChatState
