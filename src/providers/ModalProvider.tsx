'use client'

import { useEffect, useState } from 'react'

import { CreateTaskBoardModal } from '@/components/modals/CreateTaskBoardModal'
import { UpdateTaskBoardModal } from '@/components/modals/UpdateTaskBoardModal'
import { CreateTaskGroupModal } from '@/components/modals/CreateTaskGroupModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CreateTaskBoardModal />
      <UpdateTaskBoardModal />
      <CreateTaskGroupModal />
    </>
  )
}
