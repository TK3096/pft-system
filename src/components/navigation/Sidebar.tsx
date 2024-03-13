import { RouteType } from '@/types'

import { ModeToggle } from '@/components/common/ModeToggle'
import { SidebarMenu } from '@/components/navigation/SidebarMenu'
import { LogoutButton } from '@/components/auth/LogoutButton'

interface SidebarProps {
  type: RouteType
}

export const Sidebar = (props: SidebarProps) => {
  const { type } = props

  return (
    <div className='dark:bg-[#262626] h-full flex flex-col items-center py-2'>
      <ModeToggle />
      <div className='h-[2px] w-3/4 mx-auto bg-neutral-700 my-2' />
      <SidebarMenu type={type} />
      <div className='h-[2px] w-3/4 mx-auto bg-neutral-700 my-2' />
      <LogoutButton />
    </div>
  )
}
