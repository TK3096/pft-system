import { Portfolio } from '@/types'

import { PortfolioListItem } from '@/components/portfolio/PortfolioListItem'

interface PortfolioListProps {
  portfolio: Portfolio[]
}

export const PortfolioList = (props: PortfolioListProps) => {
  const { portfolio } = props

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3'>
      {portfolio.map((p) => (
        <div key={p.id}>
          <PortfolioListItem
            name={p.name}
            owner={p.owner}
            repo={p.repo}
            demo={p.demo || ''}
            rank={p.rank}
            src={p.src}
            createdAt={p.createdAt}
          />
        </div>
      ))}
    </div>
  )
}
