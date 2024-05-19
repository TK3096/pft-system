import { GroupContent } from '@/components/tasks-management/GroupContent'
import { GroupHeader } from '@/components/tasks-management/GroupHeader'
import { Separator } from '@/components/ui/separator'

const TaskGroupPage = ({
  searchParams,
}: {
  [key: string]: { g: string } | undefined
}) => {
  const groupId = searchParams?.g || ''

  return (
    <div className='h-full'>
      <GroupHeader groupId={groupId} />
      <Separator />
      <div>
        <GroupContent groupId={groupId} />
      </div>
    </div>
  )
}

export default TaskGroupPage
