'use client'

import { type LucideIcon } from 'lucide-react'

import { ActionTooltip } from '@/components/common/ActionTooltip'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface SidebarItemProps {
  label: string
  Icon: LucideIcon
  onClick: () => void
  active?: boolean
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { label, Icon, onClick, active } = props

  return (
    <ActionTooltip label={label} side='right' align='center'>
      <Button
        size='icon'
        variant='outline'
        className={cn(
          'w-8 h-8 bg-transparent border-0 hover:text-zinc-300 transition-colors duration-300',
          active && 'text-zinc-300',
        )}
        onClick={onClick}
      >
        <Icon className='w-5 h-5' />
      </Button>
    </ActionTooltip>
  )
}
