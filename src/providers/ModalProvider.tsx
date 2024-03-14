'use client'

import { useEffect, useState } from 'react'

import { CreateWorkspaceModal } from '@/components/tasks-management/CreateWorkspaceModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CreateWorkspaceModal />
    </>
  )
}
