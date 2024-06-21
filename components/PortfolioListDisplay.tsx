"use client"

import React, { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Popover, TextField } from "@mui/material"
import { createPortfolio } from "@/app/actions/portfolio"
import { useFormState } from "react-dom"
import Link from "next/link"
import PortfolioButton from "./PortfolioButton"

const PortfolioListDisplay = ({ portfolios }: { portfolios: Array<any> }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [state, formAction] = useFormState<any, any>(createPortfolio, {})
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null
  )

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index)
  }

  return (
    <div className="flex flex-col p-5 mr-14 ">
      <Link href={`/`}>
        <PortfolioButton name="Overview" value="14,892.48" />
      </Link>

      <div className="flex justify-between items-center border-red-500	">
        <label className="mt-2" htmlFor="my-portfolio">
          My portfolio({portfolios.length})
        </label>

        <Plus
          className="hover:text-secondary-text hover:cursor-pointer"
          onClick={handleClick as any}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <form action={formAction}>
            <div className="flex gap-2 justify-center items-center m-3">
              <TextField
                type="text"
                id="outlined-basic"
                label="Porfolio Name"
                variant="outlined"
                name="portfolioName"
              />

              <Button type="submit" className="mt-5" variant="contained">
                Create
              </Button>
            </div>
            {state?.errorMessage && (
              <p className="text-secondary-red ml-5">{state.errorMessage}</p>
            )}
          </form>
        </Popover>
      </div>

      {portfolios.map((portfolio: any, index: number) => (
        <PortfolioButton
          id={index}
          key={index}
          slug={portfolio.slug}
          name={portfolio.name}
          value={portfolio.total}
          handleButtonClick={handleButtonClick}
          active={activeButtonIndex === index}
        />
      ))}
    </div>
  )
}

export default PortfolioListDisplay
