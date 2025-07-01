import React from 'react'
import { Button } from '@/components/ui/button'

const AssistantList = () => {
  return (
    <div className='p-3 bg-secondary h-screen'>
      <h1 className='font-bold text-md text-center'>
        Your Personal AI Assistants
      </h1>
      <Button className='w-full mt-3'>
        Add New Assistant
      </Button>
    </div>
  )
}

export default AssistantList
