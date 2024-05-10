import React from "react"
import PortfolioButton from "../PortfolioButton"

function SideLayout() {
  return (
    <div className="flex flex-col p-5 mr-14 ">
      <PortfolioButton title="Overview" value="14,892.48" />

      <label className="mt-2" htmlFor="my-portfolio">
        My portfolio(5)
      </label>

      <PortfolioButton title="Long Term Holdings" value="8,354.56" />
      <PortfolioButton title="Long Term Holdings" value="8,354.56" />
      <PortfolioButton title="Long Term Holdings" value="8,354.56" />
    </div>
  )
}

export default SideLayout
