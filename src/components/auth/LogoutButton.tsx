'use client'

import { useRouter } from 'next/navigation'

import { LogOut } from 'lucide-react'

import { toast } from 'sonner'

import { logout } from '@/actions/logout'

import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/common/ActionTooltip'

export const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = () => {
    logout()
      .then((res) => {
        if (res.error) {
          toast.error(res.error)
          return
        }

        router.push('/')
      })
      .catch(() => toast.error('Something went wrong'))
  }

  return (
    <ActionTooltip label='sign out' side='right' align='center'>
      <Button
        size='sm'
        variant='ghost'
        className='dark:hover:text-zinc-300 transition-colors durantion-300'
        onClick={handleLogout}
      >
        <LogOut className='h-5 w-5' />
      </Button>
    </ActionTooltip>
  )
}
