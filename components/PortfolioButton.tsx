"use client"

import React from "react"
import { getRandomAvatar } from "@/utils/shared"
import Link from "next/link"
import { PortfolioBtnProps } from "@/types/types"

const PortfolioButton = ({
  id,
  slug,
  name,
  value,
  active,
  handleButtonClick,
}: PortfolioBtnProps) => {
  return (
    <Link
      href={name === "Overview" ? "/" : `/portfolio/${slug}`}
      onClick={() => handleButtonClick(id)}
    >
      <div
        className={`${
          active ? "bg-secondary-hover" : ""
        } flex flex-col justify-center min-w-80 sticky top-0 mt-2 
    rounded hover:bg-secondary-hover hover:cursor-pointer active:scale-90`}
      >
        <div className="flex gap-5  items-center p-2">
          <img
            className="w-14 h-14 rounded-full	 bg-secondary-dark"
            src={
              name === "Overview"
                ? "https://s2.coinmarketcap.com/static/cloud/img/overview.png?_=1bfd82b"
                : getRandomAvatar()
            }
            alt=""
          />
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-secondary-text">${value ? value : 0}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PortfolioButton
