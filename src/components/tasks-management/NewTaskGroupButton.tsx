'use client'

import React from 'react'

import { ArchiveIcon } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'
import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'

import { ActionTooltip } from '@/components/common/ActionTooltip'

interface NewTaskGroupButtonProps {
  boardId: string
}

export const NewTaskGroupButton: React.FC<NewTaskGroupButtonProps> = (
  props: NewTaskGroupButtonProps,
) => {
  const { boardId } = props

  const { onOpen } = useModal()
  const { isCollapsed, taskBoards } = useTasksManagement()

  const board = taskBoards.find((b) => b.id === boardId)

  const handleNewTaskGroup = () => {
    if (board) {
      onOpen('create-task-group', { taskBoard: board })
    }
  }

  return (
    <>
      {!isCollapsed && (
        <Button variant='ghost' className='w-full' onClick={handleNewTaskGroup}>
          <ArchiveIcon className='min-w-5 min-h-5 mr-2' />
          New Task Group
        </Button>
      )}
      {isCollapsed && (
        <ActionTooltip label='New group' align='center' side='right'>
          <Button variant='ghost' size='icon' onClick={handleNewTaskGroup}>
            <ArchiveIcon className='w-5 h-5' />
          </Button>
        </ActionTooltip>
      )}
    </>
  )
}
