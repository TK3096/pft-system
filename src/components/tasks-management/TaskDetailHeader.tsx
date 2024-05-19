'use client'

import React from 'react'

import { MoreVerticalIcon, EditIcon, DeleteIcon } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'
import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

interface TaskDetailHeaderProps {
  taskId: string
}

export const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = (
  props: TaskDetailHeaderProps,
) => {
  const { taskId } = props

  const { tasks, taskBoards, taskGroups } = useTasksManagement()
  const { onOpen } = useModal()

  const task = tasks.find((task) => task.id === taskId)

  const handleEdit = () => {
    if (task && taskBoards) {
      onOpen('update-task', { task, taskBoards, taskGroups })
    }
  }

  const handleDelete = () => {}

  return (
    <div className='h-[52px] flex items-center justify-between gap-3 px-3 py-2'>
      <h1 className='text-lg font-bold w-[80vw] text-nowrap overflow-scroll no-scrollbar'>
        {task ? task.name : ''}
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='p-0 w-8 h-8'>
            <MoreVerticalIcon className='w-5 h-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleEdit}
            asChild
            className='cursor-pointer'
          >
            <div className='flex gap-2 items-center justify-between w-full'>
              Edit
              <EditIcon className='w-4 h-4' />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className='cursor-pointer'
            onClick={handleDelete}
          >
            <div className='flex items-center gap-2 justify-between w-full'>
              Delete
              <DeleteIcon className='w-4 h-4' />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
