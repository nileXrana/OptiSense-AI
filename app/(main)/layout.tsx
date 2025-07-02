import React from 'react'
import Provider from './provider';
import { UserProvider } from '@/context/UserProvider';

export default function WorkspaceLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <div>
      
      <UserProvider>
        <Provider>
      {children}
      </Provider>
      </UserProvider>
      
    </div>
  )
}


