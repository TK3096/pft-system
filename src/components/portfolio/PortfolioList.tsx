import { Portfolio, PortfolioRank } from '@/types'

import { PortfolioListItem } from '@/components/portfolio/PortfolioListItem'

import data from '@/data/portfolio.json'

export const PortfolioList = () => {
  const portfolio: Portfolio[] = data.map((d) => ({
    id: d.id.toString(),
    name: d.name,
    owner: d.owner,
    repo: d.repo,
    rank: d.rank as PortfolioRank,
    src: d.src,
    demo: d.demo,
    createdAt: d.createdAt,
  }))

  return (
    <div className='grid grid-cols-3 gap-3 p-3'>
      {portfolio.map((p) => (
        <div key={p.id}>
          <PortfolioListItem portfolio={p} />
        </div>
      ))}
    </div>
  )
}
