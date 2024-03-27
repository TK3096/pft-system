'use client'

import { useParams } from 'next/navigation'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { LandingBox } from '@/components/tasks-management/LandingBox'
import { BoardContainer } from '@/components/tasks-management/BoardContainer'

export const KanbanBoard = () => {
  const params = useParams()

  const boardId = params.boardId as string

  const { tasks, boards } = useTasksManagement({ boardId })

  const board = boards[0]

  if (tasks.length === 0 || boards.length === 0) {
    return <LandingBox title='Task' description='Create your task' />
  }

  return (
    <div className='h-full w-full px-6'>
      <BoardContainer tasks={tasks} board={board} />
    </div>
  )
}
