import { Navbar } from '@/components/tasks-management/navigation/Navbar'

const BoardIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='fixed w-full inset-y-0 h-[60px] z-50'>
        <Navbar />
      </div>
      <main className='h-full pt-[85px]'>{children}</main>
    </div>
  )
}

export default BoardIdLayout
