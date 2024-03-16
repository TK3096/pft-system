'use client'

import { Workspace } from '@/types'

import { useEffect, useMemo, useState } from 'react'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { SidebarItem } from '@/components/tasks-management/navigation/SidebarItem'

import { getDocuments } from '@/lib/firebase/db'
import { WORKSPACES_COLLECTION } from '@/lib/constant'

export const SideMenu = () => {
  const { workspaces } = useTasksManagement()

  return (
    <div className='h-full flex flex-col flex-1 gap-y-3'>
      {workspaces.map((workspace) => (
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
