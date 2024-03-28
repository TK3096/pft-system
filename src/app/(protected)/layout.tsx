import { CheckAuth } from '@/components/auth/CheckAuth'

import { Sidebar } from '@/components/navigation/Sidebar'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <CheckAuth />
      <div className='hidden md:block h-full w-[80px] fixed inset-y-0 z-50'>
        <Sidebar type='private' />
      </div>
      <main className='h-full md:pl-[80px]'>{children}</main>
    </div>
  )
}

export default ProtectedLayout
