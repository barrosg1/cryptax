"use client"

import React, { useEffect, useState } from "react"
import Switch from "@mui/material/Switch"
import { Button } from "@mui/material"
import { Plus } from "lucide-react"
import { getRandomAvatar } from "@/utils/shared"
import coinData from "../data/json/coin-list-data.json"
import TransactionModal from "./TransactionModal"
import { ChartBoxHeaderProps, Asset } from "@/types/types"

type Event = React.ChangeEvent<HTMLInputElement>

const ChartBoxHeader = ({
  portfolioName,
  portfolioTotal,
}: ChartBoxHeaderProps) => {
  const [coins, setCurrencies] = useState<Array<Asset>>([])
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(true)
  const [modalOpen, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (event: Event) => {
    setChecked(event.target.checked)
  }

  const getCoinList = async () => {
    try {
      // const response = await getCurrencies()
      // setCurrencies(response)
      // console.log(response)

      setLoading(true)
      setCurrencies(coinData)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCoinList()
  }, [])

  return (
    <div className="flex justify-between items-center mt-5 flex-shrink-0">
      <div>
        <div className="flex gap-2 items-center">
          {/* <img
            className="w-8 h-8 rounded-full	 bg-secondary-dark"
            src={getRandomAvatar()}
            alt=""
          /> */}

          {portfolioName ? (
            <p className="text-secondary-tex">{portfolioName}</p>
          ) : null}
        </div>
        {portfolioTotal ? (
          <p className="text-3xl font-bold mt-5">${portfolioTotal}</p>
        ) : null}
      </div>

      <div className="flex gap-5">
        <div className="gap-2">
          <span>Show Charts</span>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        <div>
          <Button onClick={handleOpen} variant="contained" startIcon={<Plus />}>
            New Transaction
          </Button>
          {modalOpen && (
            // <SearchCoinModal
            //   coinList={coins}
            //   isOpen={modalOpen}
            //   handleClose={handleClose}
            //   loading={loading}
            // />

            <TransactionModal isOpen={modalOpen} handleClose={handleClose} />
          )}
        </div>
        <div>
          <Button className="bg-secondary-light-gray rounded-full font-semibold">
            ...
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChartBoxHeader
