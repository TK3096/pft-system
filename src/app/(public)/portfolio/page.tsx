import { PortfolioList } from '@/components/portfolio/PortfolioList'

export const revalidate = 604800 // 7 days

const PortfolioPage = () => {
  return <PortfolioList />
}

export default PortfolioPage
