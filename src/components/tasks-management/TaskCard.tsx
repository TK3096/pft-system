'use client'

import { Board, Task, TaskState } from '@/types'

import dayjs from 'dayjs'

import { Hash, Edit, PlusCircle, Pencil } from 'lucide-react'

import { useModal } from '@/hooks/useModal'

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ActionTooltip } from '@/components/common/ActionTooltip'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  board: Board
}

export const TaskCard = (props: TaskCardProps) => {
  const { task, board } = props

  const { onOpen } = useModal()

  const { name, description, state, createdAt, updatedAt } = task

  return (
    <Card
      className={cn(
        'border-none p-0 overflow-hidden h-[180px] relative',
        state === TaskState.TODO && 'bg-gray-600/50',
        state === TaskState.IN_PROGRESS && 'bg-yellow-600',
        state === TaskState.REVIEW && 'bg-indigo-400',
        state === TaskState.DONE && 'bg-green-400',
      )}
    >
      <CardHeader className='px-3 py-4 space-y-3'>
        <CardTitle className='text-md font-medium'>
          <div className='flex items-center w-full'>
            <Hash className='w-3 h-3 mr-1' />
            <div className='overflow-x-scroll md:w-[270px] no-scrollbar'>
              <p className='text-nowrap'>{name}</p>
            </div>

            <ActionTooltip label='edit' side='top' align='center'>
              <Button
                size='icon'
                variant='ghost'
                className={cn(
                  'ml-auto w-5 h-5 hover:bg-transparent',
                  state === TaskState.TODO && 'hover:text-zinc-400',
                  state === TaskState.IN_PROGRESS && 'hover:text-yellow-300',
                  state === TaskState.REVIEW && 'hover:text-indigo-200',
                  state === TaskState.DONE && 'hover:text-green-200',
                )}
                onClick={() => onOpen('editTask', { task, board })}
              >
                <Edit />
              </Button>
            </ActionTooltip>
          </div>
        </CardTitle>
        <div className='h-[80px] overflow-y-scroll no-scrollbar'>
          <CardDescription
            className={cn(
              'text-zinc-400',
              state !== TaskState.TODO && 'text-primary/80',
            )}
          >
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardFooter
        className={cn(
          'px-3 py-3 absolute bottom-0 w-full',
          state === TaskState.TODO && 'bg-gray-600/50',
          state === TaskState.IN_PROGRESS && 'bg-yellow-500',
          state === TaskState.REVIEW && 'bg-indigo-300',
          state === TaskState.DONE && 'bg-green-300',
        )}
      >
        <div className='flex justify-end items-center gap-3 w-full'>
          <ActionTooltip label='create at' side='top' align='center'>
            <div className='flex items-center'>
              <PlusCircle className='h-4 w-4 mr-1' />
              <p className='text-sm'>
                {dayjs.unix(createdAt).format('DD/MM/YYYY')}
              </p>
            </div>
          </ActionTooltip>
          <ActionTooltip label='updated at' side='top' align='center'>
            <div className='flex items-center'>
              <Pencil className='h-4 w-4 mr-1' />
              <p className='text-sm'>
                {dayjs.unix(updatedAt).format('DD/MM/YYYY')}
              </p>
            </div>
          </ActionTooltip>
        </div>
      </CardFooter>
    </Card>
  )
}
