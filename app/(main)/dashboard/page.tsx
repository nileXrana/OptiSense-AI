import React from 'react'
import AssistantList from './_component/AssistantList'
import AssistantSetting from './_component/AssistantSetting'
import ChatUi from './_component/ChatUi'

const page = () => {
  return (
    <div className='h-screen w-full fixed'>
      <div className='grid grid-cols-5'>
        <div className='hidden md:block'>
            <AssistantList/>
        </div>
        <div className='max-md:col-span-5 md:col-span-4 lg:col-span-3'>
            <ChatUi/>
        </div>
        <div className='hidden lg:block'>
            <AssistantSetting/>
        </div>
      </div>
    </div>
  )
}

export default page
