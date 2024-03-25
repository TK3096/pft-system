'use client'

import { PortfolioRank } from '@/types'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

interface PortfolioCardProps {
  name: string
  rank: PortfolioRank
}

export const PortfolioCard = (props: PortfolioCardProps) => {
  const { name, rank } = props

  return (
    <div
      className={cn(
        'project-card',
        rank === PortfolioRank.RARE && 'project-card-rare',
        rank === PortfolioRank.EPIC && 'project-card-epic',
      )}
    >
      <Card className='text-primary border-none cursor-pointer w-full h-full py-3 relative overflow-hidden'>
        <CardHeader className='px-10'>
          <CardTitle className='text-center font-medium text-nowrap'>
            <div className='overflow-x-scroll no-scrollbar'>{name}</div>
          </CardTitle>
        </CardHeader>
        <div
          className={cn(
            'absolute top-5 -left-8 rotate-[-45deg] text-sm font-bold uppercase text-center min-w-[120px] bg-neutral-600',
            rank === PortfolioRank.RARE && 'bg-blue-300',
            rank === PortfolioRank.EPIC && 'bg-red-500',
          )}
        >
          {rank}
        </div>
      </Card>
    </div>
  )
}
