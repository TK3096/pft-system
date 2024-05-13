'use client'

import React from 'react'

import { Edit } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'
import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'

interface GroupHeaderProps {
  groupId: string
}

export const GroupHeader: React.FC<GroupHeaderProps> = (
  props: GroupHeaderProps,
) => {
  const { groupId } = props

  const { taskGroups, taskBoards } = useTasksManagement()
  const { onOpen } = useModal()

  const group = taskGroups.find((group) => group.id === groupId)
  const board = taskBoards.find((board) => board.id === group?.boardId)

  const handleEdit = () => {
    onOpen('update-task-group', { taskGroup: group, taskBoard: board })
  }

  if (!group) {
    return null
  }

  return (
    <div className='h-[52px] px-3 py-2 flex items-center justify-between gap-3'>
      <h1 className='text-lg font-bold capitalize'>{group.name}</h1>
      <Button
        size='icon'
        variant='ghost'
        className='w-5 h-5'
        onClick={handleEdit}
      >
        <Edit className='w-5 h-5' />
      </Button>
    </div>
  )
}
