'use client'

import { useParams } from 'next/navigation'

import { useModal } from '@/hooks/useModal'
import { useTasksManagement } from '@/hooks/useTasksManagement'

import { Button } from '@/components/ui/button'

interface AddButtonProps {
  label: string
  type: 'workspace' | 'board' | 'task'
}

export const AddButton = (props: AddButtonProps) => {
  const { label, type } = props

  const params = useParams()
  const { workspaces } = useTasksManagement()

  const { onOpen } = useModal()

  const handleClick = () => {
    switch (type) {
      case 'workspace': {
        onOpen('createWorkspace')
        break
      }
      case 'board': {
        const workspace = workspaces.find((w) => w.id === params.workspaceId)

        onOpen('createBoard', { workspace })
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
