'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from 'react'
import { BlurFade } from '@/src/components/magicui/blur-fade'
import { RainbowButton } from '@/src/components/magicui/rainbow-button'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Link from 'next/link'
import { UserButton } from "@clerk/nextjs";

// Add custom CSS for animations
const customStyles = `
  @keyframes heartbeat {
    0% { transform: scale(1); }
    25% { transform: scale(1.1); }
    50% { transform: scale(1.3); }
    75% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  .heartbeat {
    animation: heartbeat 1.2s ease-in-out infinite;
    display: inline-block;
  }
`

export type ASSISTANT = {
  id: number,
  name: string,
  title: string,
  image: string,
  instruction: string,
  userInstruction: string,
  sampleQuestions: string[]
}

const page = () => {
  useEffect(() => {
    getUserAssistants();
  }, [])

  const getUserAssistants = async () => {
    const result = await fetch("/api/is-selected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await result.json()
    if (data.length > 0) {
      router.push('/dashboard')
    }
  }

  // use states :
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [selectedAssistants, setselectedAssistants] = useState<ASSISTANT[]>([]);

  const openLinkedIn = () => {
    window.open('https://linkedin.com/in/nilexrana', '_blank');
  }
  const onselect = (obj: ASSISTANT) => {
    const item = selectedAssistants.find((object: ASSISTANT) => object.id == obj.id);
    if (item) {
      setselectedAssistants(selectedAssistants.filter((item: ASSISTANT) => item.id !== obj.id))
      return;
    }
    setselectedAssistants(prev => [...prev, obj]);
  }
  const IsAssistantSelected = (obj: ASSISTANT) => {
    const item = selectedAssistants.find((object: ASSISTANT) => object.id == obj.id);
    return item ? true : false
  }
  const onClickContinue = async () => { // send all selected assistants to backend
    // loading effect :
    setLoading(true)
    await fetch("/api/selected-assistants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedAssistants)
    })
      .then(res => res.json())
      .then(resData => console.log(resData))
      .catch(err => console.error(err))

    // push to dashboard now :
    router.push('/dashboard')
  }

  return (
    <>
      <style jsx global>{customStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 pb-16">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <BlurFade delay={0.1}>
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* AI Assistant Robot Head */}
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                      {/* Robot eyes - more expressive */}
                      <div className="flex gap-1.5 mb-1">
                        <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
                        </div>
                        <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
                        </div>
                      </div>
                      {/* Robot mouth - friendly smile */}
                      <div className="w-4 h-1 bg-white rounded-full relative">
                        <div className="absolute inset-0 bg-white rounded-full transform scale-y-50"></div>
                      </div>
                    </div>
                  </div>
                  {/* Assistant indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  OptiSense AI
                </span>
              </div>
            </Link>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className='flex gap-5 justify-center items-center'>
              <div className='flex items-center justify-center'>
              <ModeToggle />
              </div>
              <div className='flex items-center justify-center scale-110 transform hover:scale-120'>
                <UserButton />
              </div>
            </div>
          </BlurFade>
        </header>

        {/* Main Content */}
        <div className='px-10 mt-10 md:px-28 lg:px-36 xl:px-48'>
          <div className='flex max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:gap-2 items-center justify-between'>
            <div>
              <BlurFade delay={0.25 + 1 * 0.05} inView>
                <h2 className='max-lg:text-4x max-lg:text-center text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>Welcome to the World of AI Assistants 🤖</h2>
              </BlurFade>
              <BlurFade delay={0.25 + 3 * 0.05} inView>
                <p className='max-lg:text-center text-xl text-gray-600 dark:text-gray-300 mt-2'>Choose your AI Companions to Simplify Your Tasks 👨🏻‍💻</p>
              </BlurFade>
            </div>
            <BlurFade delay={0.25 + 3 * 0.05} inView>
              <RainbowButton disabled={selectedAssistants.length == 0 || loading} onClick={onClickContinue}>
                {loading ? <Loader2 className="animate-spin" /> : 'Continue'}
              </RainbowButton>
            </BlurFade>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 mb-10'>
            {AiAssistantsList.map((obj, index) => (
              <BlurFade key={obj.id} delay={0.25 + index * 0.1} inView>
                <div key={obj.id} className='hover:border hover:scale-105 transition-all ease-in-out cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl border border-purple-100 dark:border-purple-800 relative' onClick={() => onselect(obj)}>
                  <Checkbox className='absolute border-gray-300 top-2 left-2 z-10' checked={IsAssistantSelected(obj)} />
                  <Image src={obj.image} alt={obj.title} width={200} height={200} className='rounded-xl w-full object-cover mb-3' />
                  <h2 className='text-center font-bold text-lg text-gray-900 dark:text-gray-100'>{obj.name}</h2>
                  <h2 className='text-center text-gray-600 dark:text-gray-300'>{obj.title}</h2>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800 dark:bg-gray-900/95 backdrop-blur-md border-t border-purple-200 dark:border-purple-700 py-3 z-50 shadow-lg">
          <div className="text-center">
            <p className="text-sm text-gray-200 dark:text-gray-300">
              Made with{' '}
              <span className="heartbeat text-red-600 dark:text-red-400" style={{ fontSize: '16px' }}>❤️</span>
              {' '}by{' '}
              <button
                onClick={openLinkedIn}
                className=" hover:text-blue-500 dark:text-purple-400 dark:hover:text-purple-300 font-semibold underline decoration-2 underline-offset-2 transition-all duration-200 cursor-pointer hover:scale-110 dark:hover:decoration-purple-300"
              >
                nileXrana
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
