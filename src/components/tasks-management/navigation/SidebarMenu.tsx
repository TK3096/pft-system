'use client'

import { useParams } from 'next/navigation'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { SidebarItem } from '@/components/tasks-management/navigation/SidebarItem'

interface SideMenuProps {
  type: 'workspace' | 'board' | 'task'
}

export const SideMenu = (props: SideMenuProps) => {
  const { type } = props

  const params = useParams()

  const id = params.workspaceId ? (params.workspaceId as string) : undefined

  const { workspaces, boards } = useTasksManagement(id)

  return (
    <div className='h-full flex flex-col flex-1 gap-y-1'>
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

      {type === 'board' &&
        boards.map((board) => (
          <div key={board.id}>
            <SidebarItem
              id={board.id}
              label={board.name}
              href={`/tasks-management/${board.workspaceId}/${board.id}`}
              type='board'
            />
          </div>
        ))}
    </div>
  )
}
