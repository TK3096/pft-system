'use client'

import { Board, Workspace } from '@/types'

import { useEffect, useState, useMemo } from 'react'

import { getDocuments } from '@/lib/firebase/db'
import { BOARDS_COLLECTION, WORKSPACES_COLLECTION } from '@/lib/constant'

interface UseTasksManagement {
  workspaceId?: string
  boardId?: string
}

export const useTasksManagement = (value?: UseTasksManagement) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [boards, setBoards] = useState<Board[]>([])

  const sortedAndFilterWorkspaces = useMemo(() => {
    const filter = workspaces.filter((w) => w.status === 'active')
    return filter.sort((a, b) => a.createdAt - b.createdAt)
  }, [workspaces])

  const sortedAndFilterBoards = useMemo(() => {
    const filter = boards.filter((b) => {
      if (value?.boardId) {
        return b.id === value.boardId && b.status === 'active'
      }

      if (value?.workspaceId) {
        return b.workspaceId === value.workspaceId && b.status === 'active'
      }

      return b.status === 'active'
    })
    return filter.sort((a, b) => a.createdAt - b.createdAt)
  }, [boards, value])

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

  useEffect(() => {
    const unsubscribe = getDocuments(BOARDS_COLLECTION, (doc) => {
      const {
        name,
        description,
        status,
        workspaceId,
        owner,
        createdAt,
        updatedAt,
      } = doc.data()

      setBoards((prev) => {
        const index = prev.findIndex((b) => b.id === doc.id)

        const newData: Board = {
          id: doc.id,
          name,
          description,
          status,
          workspaceId,
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
    boards: sortedAndFilterBoards,
  }
}
