import Link from 'next/link'

export const Header = () => {
  return (
    <Link href='/tasks-management'>
      <div className='px-3 py-3 text-center text-nowrap'>
        <h3 className='capitalize text-md'>tasks management</h3>
      </div>
    </Link>
  )
}
