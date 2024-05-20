"use client"

import React, { Suspense, use, useEffect, useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { Autocomplete, TextField } from "@mui/material"
import { ChevronRight } from "lucide-react"
import { getCurrencies, getCurrency } from "@/services/currencies"
import coinData from "../data/json/coin-list-data.json"

type Coin = {
  id: string
  name: string
  symbol: string
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  p: 5,
  height: 400,
}

export default function SearchCoinModal({
  isOpen,
  handleClose,
  coinList,
  loading,
}: {
  isOpen: boolean
  handleClose: any
  coinList: Array<any>
  loading: boolean
}) {
  const [coin, setCoin] = useState<Coin>()
  const [searchCoin, setSearchCoin] = useState("")

  const filteredCoins = useMemo(
    () =>
      coinList.filter(
        (coin) =>
          (coin.name.toLowerCase().includes(searchCoin) as string) ||
          coin.symbol.toLowerCase().includes(searchCoin.toLowerCase() as string)
      ),
    [coinList, searchCoin]
  )

  const getCoin = async (coinId: string) => {
    try {
      const response = await getCurrency(coinId)
      setCoin(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className="flex flex-col rounded shadow-lg border-none" sx={style}>
        <div className="flex flex-col items-centers justify-center">
          <input
            className="w-full p-2 border-2 border-solid rounded"
            type="text"
            onChange={(e) => setSearchCoin(e.target.value)}
            placeholder="Search..."
            value={searchCoin}
          />
        </div>
        <div className="mt-3 overflow-auto">
          <div className="flex flex-col gap-1 mt-5 w-full">
            {filteredCoins.map((data) => (
              <div
                key={data.id}
                className="flex justify-between items-center hover:bg-secondary-hover cursor-pointer p-2 rounded"
              >
                <div className="flex gap-2">
                  <span>{data.name}</span>
                  <span className="text-secondary-text">{data.symbol}</span>
                </div>
                <ChevronRight />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p>{coin?.name}</p>
        </div>
      </Box>
    </Modal>
  )
}
