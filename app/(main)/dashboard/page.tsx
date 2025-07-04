import React from 'react'
import AssistantList from './_component/AssistantList'
import AssistantSetting from './_component/AssistantSetting'

const page = () => {
  return (
    <div className='h-screen w-full fixed'>
      <div className='grid grid-cols-5'>
        <div className='hidden md:block'>
            <AssistantList/>
        </div>
        <div className='max-md:col-span-5 md:col-span-4 lg:col-span-3'>
            chat ui
        </div>
        <div className='hidden lg:block'>
            <AssistantSetting/>
        </div>
      </div>
    </div>
  )
}

export default page
