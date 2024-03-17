'use client'

import { useEffect, useState } from 'react'

import { CreateWorkspaceModal } from '@/components/tasks-management/CreateWorkspaceModal'
import { EditWorkspaceModal } from '@/components/tasks-management/EditWorkspaceModal'
import { CreateBoardModal } from '@/components/tasks-management/CreateBoardModal'
import { EditBoardModal } from '@/components/tasks-management/EditBoardModal'
import { CreateTaskModal } from '@/components/tasks-management/CreateTaskModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CreateWorkspaceModal />
      <EditWorkspaceModal />
      <CreateBoardModal />
      <EditBoardModal />
      <CreateTaskModal />
    </>
  )
}
