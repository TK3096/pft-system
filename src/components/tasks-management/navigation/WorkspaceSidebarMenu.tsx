'use client'

import { Workspace } from '@/types'

import { useEffect, useMemo, useState } from 'react'

import { getDocuments } from '@/lib/firebase/db'
import { WORKSPACES_COLLECTION } from '@/lib/constant'

export const WorkspaceSidebarMenu = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  const sorted = useMemo(() => {
    return workspaces.sort((a, b) => a.createdAt - b.createdAt)
  }, [workspaces])

  useEffect(() => {
    const { unsubscribe } = getDocuments(WORKSPACES_COLLECTION, (doc) => {
      const { name, description, status, owner, createdAt, updatedAt } =
        doc.data()

      setWorkspaces((prev) => {
        const existing = prev.find((workspace) => workspace.id === doc.id)

        if (existing) {
          return prev
        }

        return [
          ...prev,
          {
            id: doc.id,
            name,
            description,
            status,
            owner,
            createdAt,
            updatedAt,
          },
        ]
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className='h-full flex flex-col flex-1 gap-y-3 overflow-scroll no-scrollbar'>
      {sorted.map((workspace) => (
        <div key={workspace.id}>
          <p>{workspace.name}</p>
        </div>
      ))}
    </div>
  )
}
