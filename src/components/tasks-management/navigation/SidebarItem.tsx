'use client'

import { Edit } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { useModal } from '@/hooks/useModal'
import { useTasksManagement } from '@/hooks/useTasksManagement'

import { ActionTooltip } from '@/components/common/ActionTooltip'

import { cn } from '@/lib/utils'

interface SidebarItemProps {
  id: string
  type: 'workspace' | 'board' | 'task'
  label: string
  href: string
  active?: boolean
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { id, type, label, href, active } = props

  const router = useRouter()

  const { onOpen } = useModal()
  const { workspaces, boards } = useTasksManagement()

  const handleClickEdit = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (type === 'workspace') {
      const workspace = workspaces.find((workspace) => workspace.id === id)

      onOpen('editWorkspace', { workspace })
    }

    if (type === 'board') {
      const board = boards.find((board) => board.id === id)

      onOpen('editBoard', { board })
    }
  }

  const handleClick = () => {
    router.push(href)
  }

  return (
    <div
      className={cn(
        'px-2 py-3 flex items-center cursor-pointer transition-colors duration-300 rounded-md dark:hover:bg-neutral-700',
        active && 'dark:bg-neutral-700',
      )}
      onClick={handleClick}
    >
      <p className='text-nowrap w-[100px] overflow-scroll no-scrollbar'>
        {label}
      </p>
      <div className='ml-auto'>
        <ActionTooltip label='edit' side='top' align='center'>
          <Edit className='w-4 h-4' onClick={handleClickEdit} />
        </ActionTooltip>
      </div>
    </div>
  )
}
