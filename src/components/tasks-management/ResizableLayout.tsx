'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable'

interface ResizableLayoutProps {
  boardSlot: React.ReactNode
  groupSlot: React.ReactNode
  taskSlot: React.ReactNode
}

export const ResizableLayout: React.FC<ResizableLayoutProps> = (
  props: ResizableLayoutProps,
) => {
  const { boardSlot, taskSlot, groupSlot } = props

  const searchParams = useSearchParams()
  const groupId = searchParams.get('g')
  const taskId = searchParams.get('t')

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='rounded-md dark:bg-neutral-900/90'
    >
      <ResizablePanel>{boardSlot}</ResizablePanel>
      {groupId && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel>{groupSlot}</ResizablePanel>
        </>
      )}
      {groupId && taskId && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel>{taskSlot}</ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}
