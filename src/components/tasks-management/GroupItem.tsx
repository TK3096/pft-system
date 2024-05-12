import React from 'react'
import Link from 'next/link'
import qs from 'query-string'

import { ArchiveIcon } from 'lucide-react'

import { ActionTooltip } from '@/components/common/ActionTooltip'

import { cn } from '@/lib/utils'

interface GroupItemProps {
  id: string
  label: string
  boardId: string
  amount: number
  isCollapsed: boolean
}

export const GroupItem: React.FC<GroupItemProps> = (props: GroupItemProps) => {
  const { id, label, boardId, amount, isCollapsed = false } = props

  const link = qs.stringifyUrl({
    url: '/tasks-management',
    query: {
      b: boardId,
      g: id,
    },
  })

  return (
    <Link href={link}>
      <div className='flex justify-between items-center text-sm px-2 py-3 rounded-md transition-colors duration-200 dark:hover:bg-neutral-800'>
        <div className={cn('flex items-center gap-2', isCollapsed && 'hidden')}>
          <ArchiveIcon className='w-4 h-4' />
          <span>{label}</span>
        </div>
        <div className={cn('block', isCollapsed && 'hidden')}>{amount}</div>
        <div className={cn('hidden', isCollapsed && 'block')}>
          <ActionTooltip label={label} side='right' align='center'>
            <ArchiveIcon className='w-5 h-5' />
          </ActionTooltip>
        </div>
      </div>
    </Link>
  )
}
