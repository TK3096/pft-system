'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

interface LoginButtonProps {
  label: string
}

export const LoginButton = (props: LoginButtonProps) => {
  const { label } = props

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
      {label}
    </Button>
  )
}
