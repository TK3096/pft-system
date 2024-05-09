'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

interface TMLayoutProps {
  boardSlot: React.ReactNode
  taskSlot: React.ReactNode
  workspaceSlot: React.ReactNode
}

export const TMLayout: React.FC<TMLayoutProps> = (props: TMLayoutProps) => {
  const { boardSlot, taskSlot, workspaceSlot } = props

  const searchParams = useSearchParams()

  const boardParam = searchParams.get('b')
  const taskParam = searchParams.get('t')

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='bg-neutral-900/70 rounded-md'
    >
      <ResizablePanel
        collapsible={true}
        defaultSize={18}
        minSize={15}
        maxSize={20}
      >
        {workspaceSlot}
      </ResizablePanel>
      {boardParam && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={82}>{boardSlot}</ResizablePanel>
        </>
      )}
      {taskParam && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={20}>{taskSlot}</ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}
