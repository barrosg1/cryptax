"use client"

import React, { useState } from "react"
import Switch from "@mui/material/Switch"
import { Button } from "@mui/material"
import { Plus } from "lucide-react"
import { getRandomAvatar } from "@/utils/shared"
import SearchCoinModal from "./SearchCoinModal"

type Event = React.ChangeEvent<HTMLInputElement>

const ChartBoxHeader = () => {
  const [checked, setChecked] = useState(true)
  const [modalOpen, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (event: Event) => {
    setChecked(event.target.checked)
  }

  return (
    <div className="flex justify-between items-center mt-5 flex-shrink-0">
      <div>
        <div className="flex gap-2 items-center">
          <img
            className="w-8 h-8 rounded-full	 bg-secondary-dark"
            src={getRandomAvatar()}
            alt=""
          />
          <p className="text-secondary-tex">Long Term Holdings</p>
        </div>
        <p className="text-3xl font-bold mt-5">$8,347.67</p>
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
            Add Transaction
          </Button>
          {modalOpen && (
            <SearchCoinModal isOpen={modalOpen} handleClose={handleClose} />
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
