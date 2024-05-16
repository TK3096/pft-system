'use client'

import React from 'react'

import { MoreVerticalIcon, NotepadTextIcon } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

interface TaskDetailHeaderProps {
  taskId: string
}

export const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = (
  props: TaskDetailHeaderProps,
) => {
  const { taskId } = props

  const { tasks } = useTasksManagement()

  const task = tasks.find((task) => task.id === taskId)

  return (
    <div className='h-[52px] flex items-center justify-between gap-3 px-3 py-2'>
      <h1 className='text-lg font-bold'>{task ? task.name : ''}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='p-0 w-8 h-8'>
            <MoreVerticalIcon className='w-5 h-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className='pl-4'>Edit</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <DropdownMenuItem>
                {/* <NotepadTextIcon /> */}
                Status
              </DropdownMenuItem>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Open</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>Group</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
