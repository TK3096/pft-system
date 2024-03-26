import { Portfolio } from '@/types'

import { PORTFOLIO_COLLECTION } from '@/lib/constant'
import { list } from '@/lib/firebase-sdk/db'

export const Navbar = async () => {
  const portfolio = await list<Portfolio>(PORTFOLIO_COLLECTION)

  const common = portfolio?.filter((p) => p.rank === 'common').length || 0
  const rare = portfolio?.filter((p) => p.rank === 'rare').length || 0
  const epic = portfolio?.filter((p) => p.rank === 'epic').length || 0

  return (
    <div className='h-full shadow-lg flex items-center justify-center py-6 dark:bg-stone-800'>
      <div className='flex items-center gap-5'>
        <div className='capitalize text-neutral-300 text-sm'>
          common: <span className='text-bold text-xl'>{common}</span>
        </div>
        <div className='capitalize text-blue-500 text-sm'>
          rare: <span className='text-bold text-xl'>{rare}</span>
        </div>
        <div className='capitalize text-red-500 text-sm'>
          epic: <span className='text-bold text-xl'>{epic}</span>
        </div>
      </div>
    </div>
  )
}
