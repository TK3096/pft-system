'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export const LoginButton = () => {
  const router = useRouter()

  const handleGoToLoginPage = () => {
    router.push('/auth/login')
  }

  return (
    <Button
      variant='primary'
      size='lg'
      onClick={handleGoToLoginPage}
      className='w-full'
    >
      Sign in
    </Button>
  )
}
