import { Metadata } from 'next'

import { TMLayout } from '@/components/tasks-management/TMLayout'

export const metadata: Metadata = {
  title: 'PFT System | Tasks Management',
}

const TasksManagementLayout = ({
  board,
  task,
  workspace,
}: {
  board: React.ReactNode
  task: React.ReactNode
  workspace: React.ReactNode
}) => {
  return (
    <div className='h-full px-4 py-6'>
      <TMLayout boardSlot={board} taskSlot={task} workspaceSlot={workspace} />
    </div>
  )
}

export default TasksManagementLayout
