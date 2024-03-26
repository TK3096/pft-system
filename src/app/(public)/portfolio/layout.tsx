import { Navbar } from '@/components/portfolio/Navbar'

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='fixed inset-y-0 z-40 w-full h-[40px]'>
        <Navbar />
      </div>
      <main className='h-full pt-[50px]'>{children}</main>
    </div>
  )
}

export default PortfolioLayout
