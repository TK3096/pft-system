'use client'

import React from 'react'

import { Edit } from 'lucide-react'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { Button } from '@/components/ui/button'

interface GroupHeaderProps {
  groupId: string
}

export const GroupHeader: React.FC<GroupHeaderProps> = (
  props: GroupHeaderProps,
) => {
  const { groupId } = props

  const { taskGroups } = useTasksManagement()

  const group = taskGroups.find((group) => group.id === groupId)

  const handleEdit = () => {}

  if (!group) {
    return null
  }

  return (
    <div className='h-[52px] px-3 py-2 flex items-center justify-between gap-3'>
      <h1 className='text-lg font-bold capitalize'>{group.name}</h1>
      <Button size='icon' variant='ghost' className='w-5 h-5'>
        <Edit className='w-5 h-5' />
      </Button>
    </div>
  )
}
