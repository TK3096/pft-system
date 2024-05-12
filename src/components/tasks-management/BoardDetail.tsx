'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { Edit } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'
import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/common/ActionTooltip'

import { cn } from '@/lib/utils'

export const BoardDetail: React.FC = () => {
  const searchParams = useSearchParams()

  const { taskBoards, isCollapsed } = useTasksManagement()
  const { onOpen } = useModal()

  const boardId = searchParams.get('b')
  const board = taskBoards.find((board) => board.id === boardId)

  if (!board) {
    return null
  }

  const handleEdit = () => {
    onOpen('update-task-board', { taskBoard: board })
  }

  return (
    <div className='flex justify-between gap-2'>
      <p
        className={cn('text-muted-foreground text-sm', isCollapsed && 'hidden')}
      >
        {board.description}
      </p>
      <div className={cn(isCollapsed && 'mx-auto')}>
        <ActionTooltip label='edit board' side='right' align='center'>
          <Button
            size='icon'
            variant='ghost'
            className='w-5 h-5'
            onClick={handleEdit}
          >
            <Edit className='w-5 h-5' />
          </Button>
        </ActionTooltip>
      </div>
    </div>
  )
}
