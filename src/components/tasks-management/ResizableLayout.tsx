'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable'

import { cn } from '@/lib/utils'

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

  const { isCollapsed, onCollapsed } = useTasksManagement()

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='dark:bg-neutral-900/90'
    >
      <ResizablePanel
        id='task-board'
        defaultSize={18}
        collapsible={true}
        collapsedSize={5}
        maxSize={20}
        minSize={15}
        onExpand={() => {
          onCollapsed(false)
        }}
        onCollapse={() => {
          onCollapsed(true)
        }}
        className={cn(isCollapsed && 'transition-all duration-300 ease-in-out')}
      >
        {boardSlot}
      </ResizablePanel>
      {groupId && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel id='task-group'>{groupSlot}</ResizablePanel>
        </>
      )}
      {groupId && taskId && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel id='task'>{taskSlot}</ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}
