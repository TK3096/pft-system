'use client'

import { useEffect, useState } from 'react'

import { CreateTaskBoard } from '@/components/modals/CreateTaskBoard'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CreateTaskBoard />
    </>
  )
}
