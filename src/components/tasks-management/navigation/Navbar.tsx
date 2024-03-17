'use client'

import { useParams } from 'next/navigation'

import { Hash } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { AddButton } from '@/components/tasks-management/AddButton'

export const Navbar = () => {
  const params = useParams()

  const { boards } = useTasksManagement({
    boardId: params.boardId as string,
  })

  if (boards.length === 0) {
    return (
      <div className='h-full w-full px-5 flex items-center dark:bg-neutral-800 shadow-md' />
    )
  }

  const board = boards[0]

  return (
    <div className='h-full w-full px-5 flex items-center dark:bg-neutral-800 shadow-md'>
      <div className='flex items-center gap-x-7'>
        <div className='flex items-center gap-x-3 font-semibold'>
          <Hash className='w-6 h-6' />
          <h3>{board.name}</h3>
        </div>

        <AddButton label='new task' type='task' />
      </div>
    </div>
  )
}
