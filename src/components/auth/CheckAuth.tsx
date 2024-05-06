'use client'

import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

export const CheckAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const auth = async () => {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
      })

      const json = await response.json()

      if (response.ok && !json.status) {
        router.refresh()
      }
    }

    auth()
  }, [router])

  return null
}
