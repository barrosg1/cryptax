"use client"

import React, { SetStateAction, useEffect, useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import TransactionForm from "./TransactionForm"
import { Portfolio } from "@/types/types"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  p: 5,
}

export default function TransactionModal({
  isOpen,
  handleClose,
  portfolio,
}: {
  isOpen: boolean
  handleClose: any
  portfolio: Portfolio
}) {
  const [active, setIsActive] = useState(1)

  const DATA_TABS: Array<{ id: number; tabTitle: string }> = [
    {
      id: 1,
      tabTitle: "Buy",
    },
    {
      id: 2,
      tabTitle: "Sell",
    },
  ] as const

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className="rounded shadow-lg border-none" sx={style}>
        <div className="flex flex-col justify-center items-center">
          <Typography variant="h6" mb={3}>
            Add Transaction
          </Typography>

          {portfolio && portfolio.name && (
            <div className="flex gap-2">
              <p>Portfolio: </p>
              <p className="font-semibold	">{portfolio.name}</p>
            </div>
          )}

          {/* <div className="flex gap-1">
            <img
              className="w-6"
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/3077.png"
              alt=""
            />
            <p>VeChain</p>
            <p className="text-secondary-text">VET</p>
          </div> */}

          <ul
            className="flex w-full justify-center items-center gap-10 
              rounded mt-5 mb-5 p-1 bg-secondary-light-gray"
          >
            {DATA_TABS.map((item, i) => (
              <li
                key={i}
                className={`${
                  active === item.id ? "bg-white" : ""
                } text-center w-1/2 rounded p-2 cursor-pointer active:scale-90`}
                onClick={() => setIsActive(item.id)}
              >
                {item.tabTitle}
              </li>
            ))}
          </ul>

          <TransactionForm active={active} />
        </div>
      </Box>
    </Modal>
  )
}
