'use client'

import React from 'react'

import { Task, TaskStatus } from '@/types'

import { MoreVerticalIcon, EditIcon } from 'lucide-react'

import { ColumnDef } from '@tanstack/react-table'

import { useModal } from '@/hooks/useModal'
import { useTasksManagement } from '@/hooks/useTasksManagement'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

import { formatDate } from '@/lib/utils'

const EditTaskAction: React.FC<{ task: Task }> = ({ task }: { task: Task }) => {
  const { onOpen } = useModal()
  const { taskGroups, taskBoards } = useTasksManagement()

  const handleClick = () => {
    onOpen('update-task', { task, taskGroups, taskBoards })
  }

  return (
    <div className='w-full flex items-center' onClick={handleClick}>
      Edit
      <EditIcon className='h-4 w-4 ml-auto' />
    </div>
  )
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'tag',
    header: 'Tag',
    cell: ({ row }) => {
      const task = row.original
      let badgeVariant: 'default' | 'destructive' | 'outline' = 'default'

      switch (task.tag) {
        case 'Bug':
          badgeVariant = 'destructive'
          break
        case 'Feature':
          badgeVariant = 'outline'
          break
        default:
          badgeVariant = 'default'
          break
      }

      if (!task.tag) {
        return <div>-</div>
      }

      return <Badge variant={badgeVariant}>{task.tag}</Badge>
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const task = row.original
      let badgeVariant: 'default' | 'success' | 'warning' | 'info' = 'default'

      switch (task.status) {
        case TaskStatus.DONE:
          badgeVariant = 'success'
          break
        case TaskStatus.IN_PROGRESS:
          badgeVariant = 'warning'
          break
        case TaskStatus.TESTING:
          badgeVariant = 'info'
          break
        default:
          badgeVariant = 'default'
          break
      }

      return (
        <Badge variant={badgeVariant} className='font-bold' size='square'>
          {task.status.toUpperCase()}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const task = row.original

      return <div>{formatDate(task.createdAt)}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='p-0 w-8 h-8'>
              <span className='sr-only'>Open menu</span>
              <MoreVerticalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>
              <EditTaskAction task={task} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
