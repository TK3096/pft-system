import { Metadata } from 'next'

import { ResizableLayout } from '@/components/tasks-management/ResizableLayout'

import { TasksManagementProvider } from '@/providers/TasksManagementProvider'
import { Suspense } from 'react'

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
      <Suspense>
        <div className='h-full'>
          <ResizableLayout
            boardSlot={board}
            groupSlot={group}
            taskSlot={task}
          />
        </div>
      </Suspense>
    </TasksManagementProvider>
  )
}

export default TasksManagementLayout
