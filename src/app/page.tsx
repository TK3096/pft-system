import { CardWrapper } from '@/components/auth/CardWrapper'
import { LoginButton } from '@/components/auth/LoginButton'

const HomePage = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <CardWrapper
        title='Welcome to PFT System'
        description='Do you want to sign in?'
      >
        <div className='mt-8'>
          <LoginButton />
        </div>
      </CardWrapper>
    </div>
  )
}

export default HomePage
