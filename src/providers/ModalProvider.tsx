'use client'

import { useEffect, useState } from 'react'

import { CreateWorkspaceModal } from '@/components/tasks-management/CreateWorkspaceModal'
import { EditWorkspaceModal } from '@/components/tasks-management/EditWorkspaceModal'

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
    </>
  )
}
