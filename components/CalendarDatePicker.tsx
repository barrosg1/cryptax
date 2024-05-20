"use client"

import React, { useState } from "react"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"
import {
  PickerChangeHandlerContext,
  DateValidationError,
} from "@mui/x-date-pickers"

const CalendarDatePicker = ({
  value,
  handleDateChange,
}: {
  value: Dayjs | null
  handleDateChange:
    | ((
        value: dayjs.Dayjs | null,
        context: PickerChangeHandlerContext<DateValidationError>
      ) => void)
    | undefined
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <div className="w-auto">
          <DatePicker label="Date" value={value} onChange={handleDateChange} />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default CalendarDatePicker
