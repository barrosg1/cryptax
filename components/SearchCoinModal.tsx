import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { Autocomplete, TextField } from "@mui/material"
import { tableData } from "@/data"
import { ChevronRight } from "lucide-react"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  p: 5,
}

export default function SearchCoinModal({
  isOpen,
  handleClose,
}: {
  isOpen: boolean
  handleClose: any
}) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        className="flex flex-col rounded shadow-lg border-none"
        sx={style}
        maxHeight={600}
      >
        <div className="flex flex-col items-centers justify-center">
          <div className="sticky top-0">
            <Autocomplete
              className=""
              disablePortal
              id="combo-box-demo"
              options={tableData}
              sx={{ width: 300 }}
              autoHighlight
              getOptionLabel={(option) =>
                option.asset.name || option.asset.symbol
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={option.asset.img}
                    alt=""
                  />
                  {option.asset.name} {option.asset.symbol}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label="Search" />}
            />
          </div>
        </div>
        <div className="mt-3 overflow-auto">
          <div className="flex flex-col gap-1 mt-5 w-full">
            {tableData.map((data, i) => (
              <div className="flex justify-between items-center hover:bg-secondary-hover hover:cursor-pointer p-1 rounded">
                <div className="flex gap-2">
                  <img className="w-7 h-7" src={data.asset.img} alt="" />
                  {data.asset.name} {data.asset.symbol}
                </div>
                <ChevronRight />
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Modal>
  )
}
