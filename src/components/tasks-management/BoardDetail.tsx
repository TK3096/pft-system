'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { Edit } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'
import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/common/ActionTooltip'

export const BoardDetail: React.FC = () => {
  const searchParams = useSearchParams()

  const { taskBoards } = useTasksManagement()

  const boardId = searchParams.get('b')
  const board = taskBoards.find((board) => board.id === boardId)

  if (!board) {
    return null
  }

  return (
    <div className='flex justify-between gap-2'>
      <p className='text-muted-foreground text-sm'>{board.description}</p>
      <ActionTooltip label='edit board'>
        <Button size='icon' variant='ghost' className='w-5 h-5'>
          <Edit className='w-5 h-5' />
        </Button>
      </ActionTooltip>
    </div>
  )
}
