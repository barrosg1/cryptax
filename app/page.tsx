import { PortfolioSection } from "@/components/PortfolioSection"
import { getPortfolios } from "@/lib/portfolio"

export default async function Home() {
  const portfolios = await getPortfolios()

  return (
    <div className="flex w-full">
      <PortfolioSection portfolios={portfolios} />
    </div>
  )
}
