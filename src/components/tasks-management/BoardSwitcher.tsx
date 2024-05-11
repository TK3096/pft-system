'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'

import { PlusCircleIcon } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'
import { useModal } from '@/hooks/useModal'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

export const BoardSwitcher = () => {
  const router = useRouter()

  const [selected, setSelected] = useState<string>('')

  const { taskBoards } = useTasksManagement()
  const { onOpen } = useModal()

  const handleSelectBoard = (value: string) => {
    if (value === 'new') {
      onOpen('create-task-board')
      return
    }

    const url = qs.stringifyUrl({
      url: '/tasks-management',
      query: { b: value },
    })
    setSelected(value)

    router.replace(url)
  }

  return (
    <Select onValueChange={handleSelectBoard}>
      <SelectTrigger>
        <SelectValue placeholder='Select a board'>
          {selected
            ? taskBoards.find((board) => board.id === selected)?.name
            : ''}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {taskBoards.map((board) => (
          <SelectItem key={board.id} value={board.id}>
            <div>{board.name}</div>
          </SelectItem>
        ))}
        <Separator />
        <SelectItem value='new'>
          <div className='flex items-center gap-2'>
            <PlusCircleIcon className='w-4 h-4' />
            New Board
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
