import { Board, Task } from '@/types'

import { TaskCard } from '@/components/tasks-management/TaskCard'

interface BoardContainerProps {
  tasks: Task[]
  board: Board
}

export const BoardContainer = (props: BoardContainerProps) => {
  const { tasks, board } = props

  return (
    <div className='min-h-full w-full py-6 px-4 rounded-md shadow-md border-none dark:bg-neutral-800 grid gap-3 auto-rows-max grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskCard task={task} board={board} />
        </div>
      ))}
    </div>
  )
}
