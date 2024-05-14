'use client'

import { Task } from '@/types'

import dayjs from 'dayjs'

import { MoreVerticalIcon, EditIcon } from 'lucide-react'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'tag',
    header: 'Tag',
    cell: ({ row }) => {
      const task = row.original

      return <div>{task.tag}</div>
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

      return <div>{task.status}</div>
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

      return <div>{dayjs(task.createdAt).format('YYYY-MM-DD HH:MM:ss')}</div>
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
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={(e) => {
                e.stopPropagation()
                console.log('qq')
              }}
            >
              Edit
              <EditIcon className='h-4 w-4 ml-auto' />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
