import { GroupHeader } from '@/components/tasks-management/GroupHeader'
import { Separator } from '@/components/ui/separator'

const TaskGroupPage = ({
  searchParams,
}: {
  [key: string]: { g: string; b: string } | undefined
}) => {
  const groupId = searchParams?.g || ''
  const boardId = searchParams?.b || ''

  return (
    <div className='h-full'>
      <GroupHeader groupId={groupId} />
      <Separator />
      <h1>TaskGroupPage</h1>
    </div>
  )
}

export default TaskGroupPage
