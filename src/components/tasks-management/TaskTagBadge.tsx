import React from 'react'

import { Badge } from '@/components/ui/badge'

interface TaskTagBadgeProps {
  tag: string
}

export const TaskTagBadge: React.FC<TaskTagBadgeProps> = (
  props: TaskTagBadgeProps,
) => {
  const { tag } = props

  let badgeVariant: 'default' | 'destructive' | 'outline' = 'default'

  switch (tag.toLowerCase()) {
    case 'bug':
      badgeVariant = 'destructive'
      break
    case 'feature':
      badgeVariant = 'outline'
      break
    default:
      badgeVariant = 'default'
      break
  }

  if (!tag) {
    return <div>-</div>
  }

  return (
    <Badge variant={badgeVariant} className='uppercase'>
      {tag}
    </Badge>
  )
}
