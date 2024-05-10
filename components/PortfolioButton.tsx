import React from "react"
import { getRandomAvatar } from "@/utils/shared"

type PortfolioBtnProps = {
  title: string
  value: string
}

const PortfolioButton = ({ title, value }: PortfolioBtnProps) => {
  return (
    <div
      className="flex flex-col justify-center min-w-80 sticky top-0 mt-2 
    rounded hover:bg-secondary-hover hover:cursor-pointer"
    >
      <div className="flex gap-5  items-center p-2">
        <img
          className="w-14 h-14 rounded-full	 bg-secondary-dark"
          src={
            title === "Overview"
              ? "https://s2.coinmarketcap.com/static/cloud/img/overview.png?_=1bfd82b"
              : getRandomAvatar()
          }
          alt=""
        />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-secondary-text">${value}</p>
        </div>
      </div>
    </div>
  )
}

export default PortfolioButton
