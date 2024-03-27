'use client'

import { Task } from '@/types'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Search } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'
import { useModal } from '@/hooks/useModal'

import {
  CommandDialog,
  CommandEmpty,
  CommandItem,
  CommandInput,
  CommandList,
} from '@/components/ui/command'

export const SearchBox = () => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const { boards, tasks } = useTasksManagement()
  const { onOpen } = useModal()

  const handleClick = () => {
    setOpen(true)
  }

  const handleSelectTask = (task: Task) => {
    const boardId = task.boardId
    const board = boards.find((b) => b.id === boardId)
    const workspaceId = board?.workspaceId

    onOpen('editTask', { task, board })
    setOpen(false)

    router.push(`/tasks-management/${workspaceId}/${boardId}`)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <button
        className='flex items-center justify-center gap-2 px-3 py-2 w-full dark:bg-neutral-800 rounded-md text-muted-foreground'
        onClick={handleClick}
      >
        <Search className='w-4 h-4' />
        <p className='text-sm text-muted-foreground'>
          Press{' '}
          <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
            <span className='text-xs'>⌘</span>K
          </kbd>
        </p>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search task' />
        <CommandList>
          <CommandEmpty>No tasks found</CommandEmpty>
          {tasks.map((task) => (
            <CommandItem key={task.id} onSelect={() => handleSelectTask(task)}>
              <span>{task.name}</span>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
