import { Metadata } from 'next'

import { ResizableLayout } from '@/components/tasks-management/ResizableLayout'

import { TasksManagementProvider } from '@/providers/TasksManagementProvider'

export const metadata: Metadata = {
  title: 'PFT System | Tasks Management',
}

const TasksManagementLayout = ({
  board,
  group,
  task,
}: {
  board: React.ReactNode
  group: React.ReactNode
  task: React.ReactNode
}) => {
  return (
    <TasksManagementProvider>
      <div className='h-full px-4 py-6'>
        <ResizableLayout boardSlot={board} groupSlot={group} taskSlot={task} />
      </div>
    </TasksManagementProvider>
  )
}

export default TasksManagementLayout
