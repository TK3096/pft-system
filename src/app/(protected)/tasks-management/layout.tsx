import { WorkspaceSidebar } from '@/components/tasks-management/navigation/WorkspaceSidebar'

const TasksManagementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='fixed inset-y-0 z-40 h-full w-[180px]'>
        <WorkspaceSidebar />
      </div>
      <main className='pl-[180px] h-full'>{children}</main>
    </div>
  )
}

export default TasksManagementLayout
