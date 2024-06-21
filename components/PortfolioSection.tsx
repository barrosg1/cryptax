"use client"

import React, { useContext, useEffect, useState } from "react"
import ChartBoxHeader from "./ChartBoxHeader"
import CardBox from "./ui/CardBox"
import StickyHeadTable from "./StickyHeadTable"
import { useFormState } from "react-dom"
import { createPortfolio } from "@/app/actions/portfolio"
import { TextField, Button } from "@mui/material"

export const PortfolioSection = ({ portfolios }: { portfolios: any }) => {
  const [state, formAction] = useFormState<any, any>(createPortfolio, {})

  return (
    <div className="flex-1  overflow-hidden pr-5">
      <ChartBoxHeader portfolioTotal={""} />
      {portfolios && portfolios.length > 0 ? (
        <>
          <h1>Total Value</h1>
          <h3>0</h3>
          <div className="flex gap-5 mt-7">
            <CardBox>
              <p>All-time Profit</p>
              <p
                className={
                  portfolios.assets && portfolios.assets.length > 0
                    ? `text-red-600`
                    : ""
                }
              >
                $0
              </p>
            </CardBox>
          </div>

          <div className="flex gap-5 mt-10 pr-5 pb-5 pl-1">
            <StickyHeadTable data={portfolios.assets} isOverview={true} />
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <h1 className="text-bold">
            There are currently no portfolios. Create a new one to get started.
          </h1>
          <form action={formAction}>
            <div className="flex gap-2  items-center m-3">
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
              <p className="text-secondary-red ">{state.errorMessage}</p>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
