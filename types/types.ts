export type Asset = {
  id: string
  name: string
  symbol: string
}

export type Portfolio = {
  id: number
  slug: string
  name: string
  total: string
}

export type PortfolioBtnProps = {
  id?: number
  slug?: string
  name: string
  value: string
  active?: boolean
  handleButtonClick?: any
}

export type PortfolioListProps = {
  portfolioList: Array<Portfolio>
}

export type PortfolioDetailProps = {
  data: any
  portfolio?: Portfolio
  isOverview: boolean
}

export type ChartBoxHeaderProps = {
  portfolioName?: string
  portfolioTotal: string
}

export type Column = {
  id: "asset" | "allocation" | "balance" | "value" | "website" | "actions"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

export type StickyHeadTableProps = {
  data: any
  isOverview: boolean
}
