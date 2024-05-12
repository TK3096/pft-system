'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

import { PlusCircleIcon, ChevronDown } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'
import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export const BoardSwitcher = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const boardId = searchParams.get('b')

  const [selected, setSelected] = useState<string>(boardId || '')

  const { taskBoards } = useTasksManagement()
  const { onOpen } = useModal()

  const handleSelectBoard = (value: string) => {
    const url = qs.stringifyUrl({
      url: '/tasks-management',
      query: { b: value },
    })

    setSelected(value)
    router.replace(url)
  }

  const handleOpenNewBoard = () => {
    onOpen('create-task-board')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='w-full justify-between'
        >
          {selected && taskBoards.length > 0
            ? taskBoards.find((board) => board.id === selected)?.name
            : 'Select a board'}
          <ChevronDown className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='start'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search board...' />
            <CommandEmpty>No board found.</CommandEmpty>
            <CommandGroup>
              {taskBoards.map((board) => (
                <CommandItem
                  key={board.id}
                  onSelect={() => handleSelectBoard(board.id)}
                >
                  <DropdownMenuItem>{board.name}</DropdownMenuItem>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem onSelect={handleOpenNewBoard}>
                <DropdownMenuItem>
                  <div className='flex items-center gap-2'>
                    <PlusCircleIcon className='w-4 h-4' />
                    New Board
                  </div>
                </DropdownMenuItem>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
