import { BoardDetail } from '@/components/tasks-management/BoardDetail'
import { BoardSwitcher } from '@/components/tasks-management/BoardSwitcher'
import { GroupList } from '@/components/tasks-management/GroupList'
import { NewTaskGroupButton } from '@/components/tasks-management/NewTaskGroupButton'
import { Separator } from '@/components/ui/separator'

const TaskBoardPage = ({
  searchParams,
}: {
  [key: string]: { b: string } | undefined
}) => {
  const boardId = searchParams?.b || ''

  return (
    <div className='h-full flex flex-col'>
      <div className='h-[52px] flex items-center p-3'>
        <BoardSwitcher boardId={boardId} />
      </div>
      {boardId && (
        <>
          <Separator />
          <BoardDetail boardId={boardId} />
          <Separator />
          <GroupList boardId={boardId} />
          <Separator />
          <div className='h-[55px] flex items-center p-3'>
            <NewTaskGroupButton boardId={boardId} />
          </div>
        </>
      )}
    </div>
  )
}

export default TaskBoardPage
