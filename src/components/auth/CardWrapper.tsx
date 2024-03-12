import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CardWrapperProps {
  title: string
  description: string
  children: React.ReactNode
}

export const CardWrapper = (props: CardWrapperProps) => {
  const { title, description, children } = props

  return (
    <Card className='w-[500px] space-y-4 shadow-md dark:bg-neutral-800'>
      <CardHeader>
        <div className='flex flex-col justify-center items-center gap-y-4'>
          <h3 className='text-3xl font-bold text-center'>{title}</h3>
          <p className='text-sm text-muted-foreground text-center'>
            {description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className='h-[2px] bg-zinc-700 w-3/4 mx-auto my-3' />
        {children}
      </CardContent>
    </Card>
  )
}
