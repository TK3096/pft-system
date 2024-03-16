import { Sidebar } from '@/components/tasks-management/navigation/Sidebar'

const TasksManagementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='fixed inset-y-0 z-40 h-full w-[180px]'>
        <Sidebar
          type='workspace'
          headerLabel='Tasks Management'
          headerHref='/tasks-management'
          addButtonLabel='new workspace'
        />
      </div>
      <main className='pl-[180px] h-full'>{children}</main>
    </div>
  )
}

export default TasksManagementLayout
