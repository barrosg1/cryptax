"use client"

import { useState } from "react"
import CardBox from "./ui/CardBox"
import StickyHeadTable from "./StickyHeadTable"
import { isNegative } from "@/utils/shared"
import { Button } from "@mui/material"
import { Plus } from "lucide-react"
import TransactionModal from "./TransactionModal"
import SearchModal from "./SearchCoinModal"
import { Asset } from "@/types/types"

export const PortfolioDetail = ({ portfolio, assets, isOverview }: any) => {
  const [modalOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="flex-1  overflow-hidden pr-5">
      {/* <ChartBoxHeader /> */}

      {isOverview && (
        <div className="flex gap-5 mt-7">
          <CardBox>
            <p>All-time Profit</p>
            <p className={isNegative(portfolio.total) ? "text-red-600" : ""}>
              ${portfolio.total}
            </p>
          </CardBox>
        </div>
      )}

      {assets && assets.length > 0 && assets.assets?.length > 0 ? (
        <div className="flex gap-5 mt-10 pr-5 pb-5 pl-1">
          <StickyHeadTable isOverview={isOverview} data={assets} />
        </div>
      ) : (
        <div className="m-14">
          <p className="mb-5">
            There are currently no transactions in this portfolio.
          </p>
          <Button onClick={handleOpen} variant="contained" startIcon={<Plus />}>
            New Transaction
          </Button>
          {modalOpen && (
            <SearchModal
              assets={assets}
              portfolioId={portfolio.id}
              isOpen={modalOpen}
              handleClose={handleClose}
              loading={loading}
            />

            // <TransactionModal
            //   portfolio={portfolio}
            //   isOpen={modalOpen}
            //   handleClose={handleClose}
            // />
          )}
        </div>
      )}
    </div>
  )
}
