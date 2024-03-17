'use client'

import { TaskState } from '@/types'

import { useParams } from 'next/navigation'

import { Hash } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { AddButton } from '@/components/tasks-management/AddButton'
import { ActionTooltip } from '@/components/common/ActionTooltip'

export const Navbar = () => {
  const params = useParams()

  const { boards, tasks } = useTasksManagement({
    boardId: params.boardId as string,
  })

  if (boards.length === 0) {
    return (
      <div className='h-full w-full px-5 flex items-center dark:bg-neutral-800 shadow-md' />
    )
  }

  const board = boards[0]

  const todos = tasks.filter((task) => task.state === TaskState.TODO)
  const inProgress = tasks.filter(
    (task) => task.state === TaskState.IN_PROGRESS,
  )
  const reviews = tasks.filter((task) => task.state === TaskState.REVIEW)
  const done = tasks.filter((task) => task.state === TaskState.DONE)

  return (
    <div className='h-full w-full px-5 flex items-center dark:bg-neutral-800 shadow-md'>
      <div className='flex items-center gap-x-7'>
        <div className='flex items-center gap-x-3 font-semibold'>
          <Hash className='w-6 h-6' />
          <h3>{board.name}</h3>
        </div>

        <div className='flex items-center gap-x-3'>
          <div className='flex items-center gap-1'>
            <p className='font-bold mr-1'>{tasks.length}</p>
            <p className='font-bold'>Tasks</p>
          </div>

          <ActionTooltip label='todo' side='bottom' align='center'>
            <div className='flex items-center gap-1'>
              <div className='h-2 w-2 rounded bg-zinc-400' />
              <p className='font-semibold'>{todos.length}</p>
            </div>
          </ActionTooltip>

          <ActionTooltip label='in progress' side='bottom' align='center'>
            <div className='flex items-center gap-1'>
              <div className='h-2 w-2 rounded bg-yellow-600' />
              <p className='font-semibold'>{inProgress.length}</p>
            </div>
          </ActionTooltip>

          <ActionTooltip label='review' side='bottom' align='center'>
            <div className='flex items-center gap-1'>
              <div className='h-2 w-2 rounded bg-indigo-400' />
              <p className='font-semibold'>{reviews.length}</p>
            </div>
          </ActionTooltip>

          <ActionTooltip label='done' side='bottom' align='center'>
            <div className='flex items-center gap-1'>
              <div className='h-2 w-2 rounded bg-green-400' />
              <p className='font-semibold'>{done.length}</p>
            </div>
          </ActionTooltip>
        </div>

        <AddButton label='new task' type='task' />
      </div>
    </div>
  )
}
