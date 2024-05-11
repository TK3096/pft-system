import { BoardSwitcher } from '@/components/tasks-management/BoardSwitcher'
import { Separator } from '@/components/ui/separator'

const TaskBoardPage = () => {
  return (
    <div>
      <div className='h-[52px] flex items-center px-3'>
        <BoardSwitcher />
      </div>
      <Separator />
    </div>
  )
}

export default TaskBoardPage
