import { prisma } from "./db"

export const getPortfolios = async () => {
  const portfolios = await prisma.portfolio.findMany()
  return portfolios
}

export const getPortfolio = async (slug: string) => {
  const portfolio = await prisma.portfolio.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      assets: true,
      total: true,
    },
  })
  return portfolio
}
