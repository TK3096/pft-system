import { BoardDetail } from '@/components/tasks-management/BoardDetail'
import { BoardSwitcher } from '@/components/tasks-management/BoardSwitcher'
import { GroupList } from '@/components/tasks-management/GroupList'
import { Separator } from '@/components/ui/separator'

const TaskBoardPage = () => {
  return (
    <div className='h-full'>
      <div className='h-[52px] flex items-center px-3'>
        <BoardSwitcher />
      </div>
      <Separator />
      <div className='px-3 py-4'>
        <BoardDetail />
      </div>
      <Separator />
      <div className='px-3 py-4'>
        <GroupList />
      </div>
    </div>
  )
}

export default TaskBoardPage
