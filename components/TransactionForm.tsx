"use client"

import { Alert, Button, Snackbar, TextField } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import React, { SetStateAction, useState } from "react"
import { Textarea } from "@mui/joy"
import { useFormState, useFormStatus } from "react-dom"
import {
  createBuyTransaction,
  createSellTransaction,
} from "@/app/actions/transaction"
import CalendarDatePicker from "./ui/CalendarDatePicker"
import TimePickerValue from "./ui/TimePickerValue"

const TransactionForm = ({ active }: { active: number }) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs())
  const [timeValue, setTimeValue] = useState<Dayjs | null>(dayjs())
  const [open, setOpen] = React.useState(false)
  const { pending } = useFormStatus()

  const handleClick = () => setOpen(true)

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return
    setOpen(false)
  }

  const handleDateChange = (e: SetStateAction<Dayjs | null>) => setDateValue(e)
  const handleTimeChange = (e: SetStateAction<Dayjs | null>) => setTimeValue(e)

  const [buyState, buyFormAction] = useFormState<any, any>(
    createBuyTransaction,
    {}
  )
  const [sellState, sellFormAction] = useFormState<any, any>(
    createSellTransaction,
    {}
  )

  return (
    <form action={active === 1 ? buyFormAction : sellFormAction}>
      <div className="flex gap-4 w-full">
        <TextField
          type="text"
          id="outlined-basic"
          label="Asset Name"
          variant="outlined"
          name="asset"
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Symbol"
          variant="outlined"
          name="symbol"
        />
      </div>

      <div className="flex gap-4 mt-5 w-full">
        <TextField
          type="text"
          id="outlined-basic"
          label="Category"
          variant="outlined"
          name="category"
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Network"
          variant="outlined"
          name="network"
        />
      </div>

      <div className="flex gap-4 mt-5 w-full">
        <TextField
          type="text"
          id="outlined-basic"
          label="Trading Platform"
          variant="outlined"
          name="trading_platform"
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Website"
          variant="outlined"
          name="website"
        />
      </div>

      <div className="flex gap-4 mt-5 w-full">
        <TextField
          type="number"
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          name="quantity"
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Price"
          variant="outlined"
          name="pricePerCoin"
          inputProps={{
            min: "0",
            step: "0.01",
          }}
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Market Cap"
          variant="outlined"
          name="market_cap"
        />
      </div>

      <div className="flex gap-4 mt-5 w-full">
        <CalendarDatePicker
          value={dateValue}
          handleDateChange={handleDateChange}
        />
        <input
          type="hidden"
          name={active === 1 ? "bought_date" : "sold_date"}
          value={String(dateValue)}
        />

        <TimePickerValue
          value={timeValue}
          handleTimeChange={handleTimeChange}
        />
        <input
          type="hidden"
          name={active === 1 ? "bought_time" : "sold_time"}
          value={String(timeValue)}
        />
      </div>

      <div className="flex flex-col gap-1 mt-5 w-full">
        <label className="text-secondary-text text-sm" htmlFor="Notes">
          Notes
        </label>
        <Textarea color="neutral" minRows={3} variant="outlined" name="notes" />
      </div>

      <div className="w-full mt-5 bg-secondary-light-gray rounded p-3">
        <p className="text-secondary-text font text-sm">
          {active === 1 ? "Total Spent" : "Total Received"}
        </p>
        <p className="font-bold text-xl mt-2">$0</p>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {active === 1 ? buyState?.errorMessage : sellState?.errorMessage}
        </Alert>
      </Snackbar>

      <Button
        type="submit"
        className="mt-5"
        variant="contained"
        onClick={handleClick}
      >
        {pending ? "..." : "Add Transaction"}
      </Button>
    </form>
  )
}

export default TransactionForm
