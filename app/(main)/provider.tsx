"use client"
import React from 'react'
import Header from './_components/Header';
import { AssistantContext } from '@/context/AssistantContext';
import { useState } from 'react';
import { UserProvider } from '@/context/UserProvider';

function Provider({
    children,
    }: Readonly<{
      children: React.ReactNode;
    }>){

      const [selectedAssistant, setselectedAssistant] = useState<any>()

  return (
    <div>
      <AssistantContext.Provider value={{selectedAssistant, setselectedAssistant}}>
      <Header/>
      <UserProvider>
      {children}
      </UserProvider>
      </AssistantContext.Provider>
    </div>
  )
}

export default Provider
