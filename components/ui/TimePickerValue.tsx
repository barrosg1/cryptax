import * as React from "react"
import dayjs, { Dayjs } from "dayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import {
  PickerChangeHandlerContext,
  TimeValidationError,
} from "@mui/x-date-pickers"

const TimePickerValue = ({
  value,
  handleTimeChange,
}: {
  value: Dayjs | null
  handleTimeChange:
    | ((
        value: dayjs.Dayjs | null,
        context: PickerChangeHandlerContext<TimeValidationError>
      ) => void)
    | undefined
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker", "TimePicker"]}>
        <div className="w-auto">
          <TimePicker label="Time" value={value} onChange={handleTimeChange} />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default TimePickerValue
