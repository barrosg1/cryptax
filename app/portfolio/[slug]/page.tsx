import { PortfolioDetail } from "@/components/PortfolioDetail"
import { getPortfolio } from "@/lib/portfolio"

const page = async ({ params }: any) => {
  const portfolio = await getPortfolio(params.slug)
  const assets = portfolio?.assets

  return (
    <PortfolioDetail portfolio={portfolio} assets={assets} isOverview={false} />
  )
}

export default page
