"use client"
import React from 'react'
import Header from './_components/Header';
import { AssistantContext } from '@/context/AssistantContext';
import { useState } from 'react';
import { UserProvider } from '@/context/UserProvider';
import { ModelProvider } from '@/context/ModelContext';

function Provider({
    children,
    }: Readonly<{
      children: React.ReactNode;
    }>){

      const [selectedAssistant, setselectedAssistant] = useState<any>()

  return (
    <div>
      <AssistantContext.Provider value={{selectedAssistant, setselectedAssistant}}>
      
      <UserProvider>
        <ModelProvider>
      {children}
        </ModelProvider>
      </UserProvider>
      </AssistantContext.Provider>
    </div>
  )
}

export default Provider
