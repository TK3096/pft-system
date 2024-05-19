'use client'

import React from 'react'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { GroupItem } from '@/components/tasks-management/GroupItem'
import { ScrollArea } from '../ui/scroll-area'

interface GroupListProps {
  boardId?: string
}

export const GroupList: React.FC<GroupListProps> = (props: GroupListProps) => {
  const { boardId } = props

  const { taskGroups, isCollapsed } = useTasksManagement()

  const groups = taskGroups.filter((group) => group.boardId === boardId)

  return (
    <ScrollArea className='h-full px-3 py-4'>
      <nav className='grid gap-1'>
        {boardId &&
          groups.map((group) => (
            <GroupItem
              key={group.id}
              id={group.id}
              label={group.name}
              boardId={boardId}
              amount={1}
              isCollapsed={isCollapsed}
            />
          ))}
      </nav>
    </ScrollArea>
  )
}
