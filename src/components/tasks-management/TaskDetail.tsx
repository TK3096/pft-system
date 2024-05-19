'use client'

import React, { useState } from 'react'
import dayjs from 'dayjs'

import { CopyIcon, CheckIcon } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { toast } from 'sonner'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/common/ActionTooltip'
import { formatDate } from '@/lib/utils'

interface TaskDetailProps {
  taskId: string
}

export const TaskDetail: React.FC<TaskDetailProps> = (
  props: TaskDetailProps,
) => {
  const { taskId } = props

  const [copied, setCopied] = useState<string>('')

  const { tasks } = useTasksManagement()

  const task = tasks.find((task) => task.id === taskId)

  if (!task) {
    return null
  }

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(value)
    toast.success('Copied to clipboard')

    setTimeout(() => {
      setCopied('')
    }, 1000)
  }

  return (
    <div className='mx-2 my-3 space-y-3 flex flex-col'>
      <div className='flex justify-between items-center gap-3'>
        <h3 className='font-bold text-lg'>Descritpion</h3>
        <p className='text-sm'>
          Created At: <span>{formatDate(task.createdAt)}</span>
        </p>
      </div>
      <Separator />
      <div className='border-2 rounded-md px-2 py-3'>
        <ScrollArea className='w-full h-[40vh]'>{task.description}</ScrollArea>
      </div>
      <h3 className='font-bold text-lg'>Remark</h3>
      <Separator />
      <ul className='px-2 py-3 flex flex-col gap-2'>
        {task.remarks.map((remark) => (
          <li
            key={remark}
            className='border-2 rounded-md p-2 flex items-center justify-between gap-3'
          >
            <p className='w-[24vw] overflow-scroll text-nowrap no-scrollbar'>
              {remark}
            </p>
            <ActionTooltip label='Copy'>
              <Button
                variant='ghost'
                className='p-0 h-4 w-4'
                onClick={() => handleCopy(remark)}
              >
                {copied !== remark && <CopyIcon className='w-4 h-4' />}
                {copied === remark && <CheckIcon className='w-4 h-4' />}
              </Button>
            </ActionTooltip>
          </li>
        ))}
      </ul>
      <p className='text-sm text-right'>
        Updated At: {formatDate(task.updatedAt)}
      </p>
    </div>
  )
}
