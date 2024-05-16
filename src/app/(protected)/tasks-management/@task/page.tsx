import { TaskDetailHeader } from '@/components/tasks-management/TaskDetailHeader'
import { Separator } from '@/components/ui/separator'

const TaskPage = ({ searchParams }: { [key: string]: { t: string } }) => {
  const taskId = searchParams?.t || ''

  return (
    <div className='h-full'>
      <TaskDetailHeader taskId={taskId} />
      <Separator />
    </div>
  )
}

export default TaskPage
