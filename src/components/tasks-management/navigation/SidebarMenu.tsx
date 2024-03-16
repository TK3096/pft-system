'use client'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { SidebarItem } from '@/components/tasks-management/navigation/SidebarItem'

interface SideMenuProps {
  type: 'workspace' | 'board' | 'task'
}

export const SideMenu = (props: SideMenuProps) => {
  const { type } = props

  const { workspaces } = useTasksManagement()

  return (
    <div className='h-full flex flex-col flex-1 gap-y-3'>
      {type === 'workspace' &&
        workspaces.map((workspace) => (
          <div key={workspace.id}>
            <SidebarItem
              id={workspace.id}
              label={workspace.name}
              href={`/tasks-management/${workspace.id}`}
              type='workspace'
            />
          </div>
        ))}
    </div>
  )
}
