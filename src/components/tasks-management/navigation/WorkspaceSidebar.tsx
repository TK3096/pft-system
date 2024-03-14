import { Header } from '@/components/tasks-management/navigation/Header'
import { AddButton } from '@/components/tasks-management/AddButton'
import { WorkspaceSidebarMenu } from '@/components/tasks-management/navigation/WorkspaceSidebarMenu'

export const WorkspaceSidebar = () => {
  return (
    <div className='h-full dark:bg-neutral-900'>
      <Header />
      <div className='h-[2px] w-3/4 mx-auto mt-2 mb-4 bg-neutral-600' />
      <div className='flex justify-center px-4'>
        <AddButton label='new workspace' type='workspace' />
      </div>
      <div className='h-[2px] w-3/4 mx-auto my-4 bg-neutral-600' />
      <div className='px-4 h-[84%]'>
        <WorkspaceSidebarMenu />
      </div>
    </div>
  )
}
