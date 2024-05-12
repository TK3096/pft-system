'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

import { PlusCircleIcon, ChevronDown, LayoutDashboardIcon } from 'lucide-react'

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
import { ActionTooltip } from '@/components/common/ActionTooltip'
import { Separator } from '../ui/separator'

export const BoardSwitcher = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const boardId = searchParams.get('b')

  const [selected, setSelected] = useState<string>(boardId || '')

  const { taskBoards, isCollapsed } = useTasksManagement()
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
      {!isCollapsed && (
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
      )}
      {isCollapsed && (
        <DropdownMenuTrigger asChild>
          <div className='mx-auto'>
            <ActionTooltip label='Task Boards' side='right' align='center'>
              <Button variant='ghost' size='icon' className='w-5 h-5 '>
                <LayoutDashboardIcon className='w-5 h-5' />
              </Button>
            </ActionTooltip>
          </div>
        </DropdownMenuTrigger>
      )}
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
          </CommandList>
        </Command>
        <Separator />
        <DropdownMenuItem
          onClick={handleOpenNewBoard}
          className='mx-1 mt-2 mb-1 h-11'
        >
          <div className='flex items-center gap-2 px-1'>
            <PlusCircleIcon className='w-4 h-4' />
            New Board
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
