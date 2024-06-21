import { getPortfolios } from "@/lib/portfolio"
import PortfolioListDisplay from "../PortfolioListDisplay"

export const SideLayout = async () => {
  const portfolios = await getPortfolios()

  return <PortfolioListDisplay portfolios={portfolios} />
}
