'use client'

import { Portfolio, PortfolioRank } from '@/types'

import { useState } from 'react'

const DEFAULT_PORTFOLIO: Portfolio[] = [
  {
    id: '1',
    name: 'Portfolio 1',
    readmeUrl:
      'https://raw.githubusercontent.com/TK3096/discord-clone/main/README.md',
    rank: PortfolioRank.COMMON,
    src: 'https://github.com/TK3096/discord-clone',
    demo: 'https://pft-system.vercel.app/',
  },
  {
    id: '2',
    name: 'Portfolio 2 Portfolio 3 Portfolio 3 Portfolio 3 Portfolio 3 Portfolio 3 Portfolio 3',
    readmeUrl:
      'https://raw.githubusercontent.com/TK3096/discord-clone/main/README.md',
    rank: PortfolioRank.RARE,
    src: 'https://github.com/TK3096/discord-clone',
  },
  {
    id: '3',
    name: 'Portfolio 3',
    readmeUrl:
      'https://raw.githubusercontent.com/TK3096/discord-clone/main/README.mdv',
    rank: PortfolioRank.EPIC,
    src: 'https://github.com/TK3096/discord-clone',
  },
]

export const usePortfolio = () => {
  const [data, setData] = useState<Portfolio[]>(DEFAULT_PORTFOLIO)

  return {
    data,
  }
}
