import { LayoutDashboard } from 'lucide-react'

interface LandingBoxProps {
  title: string
  description: string
}

export const LandingBox = (props: LandingBoxProps) => {
  const { title, description } = props

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='w-2/4 flex flex-col justify-center items-center'>
        <LayoutDashboard className='w-20 h-20' />
        <p className='text-2xl font-bold text-center mt-5'>{title}</p>
        <p className='text-md text-muted-foreground text-center mt-2'>
          {description}
        </p>
      </div>
    </div>
  )
}
