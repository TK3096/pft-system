import { CardWrapper } from '@/components/auth/CardWrapper'
import { LoginButton } from '@/components/auth/LoginButton'

import { getCurrentUser } from '@/lib/firebase-sdk/auth'

const HomePage = async () => {
  const user = await getCurrentUser()

  const description = !user
    ? 'Do you want to sign in?'
    : 'You are already signed in.'
  const buttonLabel = !user ? 'Sign in' : 'Go to app'

  return (
    <div className='flex justify-center items-center h-full'>
      <CardWrapper title='Welcome to PFT System' description={description}>
        <div className='mt-8'>
          <LoginButton label={buttonLabel} />
        </div>
      </CardWrapper>
    </div>
  )
}

export default HomePage
