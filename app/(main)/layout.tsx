import React from 'react'
import Provider from './provider';

export default function WorkspaceLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <div>
        <Provider>
      {children}
      </Provider>
    </div>
  )
}


