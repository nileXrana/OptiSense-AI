import React from 'react'
import AssistantList from './_component/AssistantList'

const page = () => {
  return (
    <div className='h-screen w-full fixed'>
      <div className='grid grid-cols-5'>
        <div className='border-2  hidden md:block'>
            {/* assistant list */}
            <AssistantList/>
        </div>
        <div className='border-2  max-md:col-span-5 md:col-span-4 lg:col-span-3'>
            {/* chat ui */}
            chat ui
        </div>
        <div className='border-2 hidden lg:block'>
            {/* setting */}
            setting
        </div>
      </div>
    </div>
  )
}

export default page
