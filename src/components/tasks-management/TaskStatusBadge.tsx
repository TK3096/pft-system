import React from 'react'

import { Badge } from '@/components/ui/badge'
import { TaskStatus } from '@/types'

interface TaskStatusBadgeProps {
  status: TaskStatus
}

export const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = (
  props: TaskStatusBadgeProps,
) => {
  const { status } = props

  let badgeVariant: 'default' | 'success' | 'warning' | 'info' = 'default'

  switch (status) {
    case TaskStatus.DONE:
      badgeVariant = 'success'
      break
    case TaskStatus.IN_PROGRESS:
      badgeVariant = 'warning'
      break
    case TaskStatus.TESTING:
      badgeVariant = 'info'
      break
    default:
      badgeVariant = 'default'
      break
  }

  return (
    <Badge variant={badgeVariant} className='font-bold' size='square'>
      {status.toUpperCase()}
    </Badge>
  )
}
