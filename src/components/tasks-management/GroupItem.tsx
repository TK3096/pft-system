import React from 'react'
import Link from 'next/link'
import qs from 'query-string'

import { ArchiveIcon } from 'lucide-react'

interface GroupItemProps {
  id: string
  label: string
  boardId: string
  amount: number
}

export const GroupItem: React.FC<GroupItemProps> = (props: GroupItemProps) => {
  const { id, label, boardId, amount } = props

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
        <div className='flex items-center gap-2'>
          <ArchiveIcon className='w-4 h-4' />
          {label}
        </div>
        <div>{amount}</div>
      </div>
    </Link>
  )
}
