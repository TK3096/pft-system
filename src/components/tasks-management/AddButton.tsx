'use client'

import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'

interface AddButtonProps {
  label: string
  type: 'workspace' | 'board' | 'task'
}

export const AddButton = (props: AddButtonProps) => {
  const { label, type } = props

  const { onOpen } = useModal()

  const handleClick = () => {
    switch (type) {
      case 'workspace': {
        onOpen('createWorkspace')
        break
      }
      default: {
        break
      }
    }
  }

  return (
    <Button
      onClick={handleClick}
      className='capitalize'
      variant='primary'
      size='sm'
    >
      {label}
    </Button>
  )
}
