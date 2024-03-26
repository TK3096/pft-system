import type { Metadata } from 'next'
import { Portfolio } from '@/types'

import { PortfolioList } from '@/components/portfolio/PortfolioList'
import { EmptyContent } from '@/components/portfolio/EmptyContent'

import { PORTFOLIO_COLLECTION } from '@/lib/constant'
import { list } from '@/lib/firebase-sdk/db'

export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'PFT System | Portfolio',
  description: 'Portfolio page for myself',
}

const PortfolioPage = async () => {
  const portfolio = await list<Portfolio>(PORTFOLIO_COLLECTION)

  if (!portfolio) {
    return <EmptyContent />
  }

  return <PortfolioList portfolio={portfolio} />
}

export default PortfolioPage
