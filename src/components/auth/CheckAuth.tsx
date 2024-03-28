'use client'

import { useEffect } from 'react'

export const CheckAuth = () => {
  useEffect(() => {
    const auth = async () => {
      await fetch('/api/auth/verify', {
        method: 'POST',
      })
    }

    auth()
  }, [])

  return null
}
