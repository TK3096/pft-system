import { Header } from '@/components/tasks-management/navigation/Header'
import { AddButton } from '@/components/tasks-management/AddButton'
import { SideMenu } from '@/components/tasks-management/navigation/SidebarMenu'

import { cn } from '@/lib/utils'

interface SidebarProps {
  type: 'workspace' | 'board' | 'task'
  headerLabel: string
  headerHref: string
  addButtonLabel: string
}

export const Sidebar = (props: SidebarProps) => {
  const { type, headerLabel, headerHref, addButtonLabel } = props

  return (
    <div
      className={cn(
        'h-full',
        type === 'workspace' && 'dark:bg-neutral-900',
        type === 'board' && 'dark:bg-neutral-800',
      )}
    >
      <Header label={headerLabel} href={headerHref} />
      <div className='h-[2px] w-3/4 mx-auto mt-2 mb-4 bg-neutral-600' />
      <div className='flex justify-center px-4'>
        <AddButton label={addButtonLabel} type={type} />
      </div>
      <div className='h-[2px] w-3/4 mx-auto my-4 bg-neutral-600' />
      <div className='px-4 h-[84%] overflow-scroll'>
        <SideMenu type={type} />
      </div>
    </div>
  )
}
