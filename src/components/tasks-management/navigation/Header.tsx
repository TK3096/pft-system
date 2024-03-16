import Link from 'next/link'

interface HeaderProps {
  label: string
  href: string
}

export const Header = (props: HeaderProps) => {
  const { label, href } = props

  return (
    <Link href={href}>
      <div className='px-3 py-3 text-center text-nowrap'>
        <h3 className='capitalize text-md'>{label}</h3>
      </div>
    </Link>
  )
}
