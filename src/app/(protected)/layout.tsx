import { logout } from '@/actions/logout'

import { Sidebar } from '@/components/navigation/Sidebar'

import { getCurrentUser } from '@/lib/firebase-sdk/auth'

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser()

  if (!user) {
    await logout()
  }

  return (
    <div className='h-full'>
      <div className='hidden md:block h-full w-[80px] fixed inset-y-0 z-50'>
        <Sidebar type='private' />
      </div>
      <main className='h-full md:pl-[80px]'>{children}</main>
    </div>
  )
}

export default ProtectedLayout
