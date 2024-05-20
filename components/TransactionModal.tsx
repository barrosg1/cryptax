"use client"

import React, { SetStateAction, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { TextField } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { Textarea } from "@mui/joy"
import CalendarDatePicker from "./CalendarDatePicker"
import TimePickerValue from "./TimePickerValue"

type InputProps = {
  quantity: string
  price: string
  date: Dayjs | null
  time: Dayjs | null
  notes: string
}

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
}: {
  isOpen: boolean
  handleClose: any
}) {
  const [inputValues, setInputValues] = useState<InputProps>({
    quantity: "",
    price: "",
    date: dayjs(),
    time: null,
    notes: "",
  })

  const [active, setIsActive] = useState(1)
  const [dateValue, setDateValue] = useState<Dayjs | null>(inputValues.date)
  const [timeValue, setTimeValue] = useState<Dayjs | null>(inputValues.time)

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const handleDateChange = (e: SetStateAction<Dayjs | null>) => {
    setInputValues({
      ...inputValues,
      date: dateValue,
    })

    setDateValue(e)
  }

  const handleTimeChange = (e: SetStateAction<Dayjs | null>) => {
    setInputValues({
      ...inputValues,
      time: timeValue,
    })

    setTimeValue(e)
  }

  const handleClick = () => {
    const { quantity, price, date, time, notes } = inputValues

    const payload = {
      quantity,
      price,
      date: date?.toDate(),
      time: time?.toDate(),
      notes,
    }

    console.log(payload)
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className="rounded shadow-lg border-none" sx={style}>
        <div className="flex flex-col justify-center items-center">
          <Typography variant="h6" mb={3}>
            Add Transaction
          </Typography>

          <div className="flex gap-1">
            <img
              className="w-6"
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/3077.png"
              alt=""
            />
            <p>VeChain</p>
            <p className="text-secondary-text">VET</p>
          </div>

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

          <div className="flex gap-4 w-full">
            <TextField
              type="number"
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              name="quantity"
              onChange={handleInputChange}
            />
            <TextField
              type="number"
              id="outlined-basic"
              label="Price Per Coin"
              variant="outlined"
              name="price"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-4 mt-5 w-full">
            <CalendarDatePicker
              value={dateValue}
              handleDateChange={handleDateChange}
            />
            <TimePickerValue
              value={timeValue}
              handleTimeChange={handleTimeChange}
            />
          </div>

          <div className="flex flex-col gap-1 mt-5 w-full">
            <label className="text-secondary-text text-sm" htmlFor="Notes">
              Notes
            </label>
            <Textarea
              color="neutral"
              minRows={3}
              variant="outlined"
              name="notes"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full mt-5 bg-secondary-light-gray rounded p-3">
            <p className="text-secondary-text font text-sm">
              {active === 1 ? "Total Spent" : "Total Received"}
            </p>
            <p className="font-bold text-xl mt-2">$0</p>
          </div>

          <Button className="mt-5" variant="contained" onClick={handleClick}>
            Add Transaction
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
