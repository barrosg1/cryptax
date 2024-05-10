"use client"

import React from "react"
import ChartBoxHeader from "../ChartBoxHeader"
import CardBox from "../CardBox"
import StickyHeadTable from "../StickyHeadTable"

const PorfolioLayout = () => {
  return (
    <div className="flex-1  overflow-hidden pr-5">
      <ChartBoxHeader />
      <div className="flex gap-5 mt-7">
        <CardBox>
          <p>All-time Profit</p>
          <p className="text-red-600">- $4,601.41</p>
        </CardBox>
        <CardBox>
          <p>All-time Profit</p>
          <p className="text-red-600">- $4,601.41</p>
        </CardBox>
        <CardBox>
          <p>All-time Profit</p>
          <p className="text-red-600">- $4,601.41</p>
        </CardBox>
      </div>

      <div className="flex gap-5 mt-10 pr-5 pb-5 pl-1">
        <StickyHeadTable />
      </div>
    </div>
  )
}

export default PorfolioLayout
