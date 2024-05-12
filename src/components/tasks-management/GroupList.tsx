'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { GroupItem } from '@/components/tasks-management/GroupItem'
import { ScrollArea } from '../ui/scroll-area'

export const GroupList: React.FC = () => {
  const searchParams = useSearchParams()

  const boardId = searchParams.get('b')

  const { taskGroups } = useTasksManagement()

  const groups = taskGroups.filter((group) => group.bordId === boardId)

  return (
    <ScrollArea className='h-[80vh]'>
      <nav className='grid gap-1'>
        {boardId &&
          groups.map((group) => (
            <GroupItem
              key={group.id}
              id={group.id}
              label={group.name}
              boardId={boardId}
              amount={1}
            />
          ))}
      </nav>
    </ScrollArea>
  )
}
