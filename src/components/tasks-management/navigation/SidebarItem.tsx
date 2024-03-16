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
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { id, type, label, href } = props

  const router = useRouter()

  const { onOpen } = useModal()
  const { workspaces } = useTasksManagement()

  const handleClickEdit = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (type === 'workspace') {
      const workspace = workspaces.find((workspace) => workspace.id === id)

      onOpen('editWorkspace', { workspace })
    }
  }

  const handleClick = () => {
    router.push(href)
  }

  return (
    <div
      className='px-2 py-3 flex items-center cursor-pointer transition-colors duration-300 rounded-md dark:hover:bg-stone-700'
      onClick={handleClick}
    >
      <p>{label}</p>
      <div className='ml-auto'>
        <ActionTooltip label='edit' side='top' align='center'>
          <Edit className='w-4 h-4' onClick={handleClickEdit} />
        </ActionTooltip>
      </div>
    </div>
  )
}
