import { AlertTriangle } from 'lucide-react'

interface FormErrorProps {
  message: string
}

export const FormError = (props: FormErrorProps) => {
  const { message } = props

  if (!message) return null

  return (
    <div className='bg-destructive/15 dark:bg-rose-700/70 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive dark:text-rose-200'>
      <AlertTriangle className='h-5 w-5' />
      <p>{message}</p>
    </div>
  )
}
