'use client'

import { Workspace } from '@/types'

import { useEffect, useState, useMemo } from 'react'

import { getDocuments } from '@/lib/firebase/db'
import { WORKSPACES_COLLECTION } from '@/lib/constant'

export const useTasksManagement = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  const sortedAndFilterWorkspaces = useMemo(() => {
    const filter = workspaces.filter((w) => w.status === 'active')
    return filter.sort((a, b) => a.createdAt - b.createdAt)
  }, [workspaces])

  useEffect(() => {
    const unsubscribe = getDocuments(WORKSPACES_COLLECTION, (doc) => {
      const { name, description, status, owner, createdAt, updatedAt } =
        doc.data()

      setWorkspaces((prev) => {
        const index = prev.findIndex((w) => w.id === doc.id)

        const newData: Workspace = {
          id: doc.id,
          name,
          description,
          status,
          owner,
          createdAt,
          updatedAt,
        }

        if (index !== -1) {
          const temp = [...prev]
          temp[index] = newData

          return temp
        }

        return [...prev, newData]
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return {
    workspaces: sortedAndFilterWorkspaces,
  }
}
