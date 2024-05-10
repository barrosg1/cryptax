import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { TextField } from "@mui/material"

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
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        className="flex flex-col items-center rounded shadow-lg border-none"
        sx={style}
      >
        <Typography variant="h6" mb={3}>
          Add Transaction
        </Typography>

        <hr />

        <div className="flex items-center gap-1">
          <img
            className="w-9"
            src="https://s2.coinmarketcap.com/static/img/coins/64x64/3077.png"
            alt=""
          />
          <p>VeChain</p>
          <p className="text-secondary-text">VET</p>
        </div>

        <ul className="flex w-full justify-center items-center gap-10 rounded bg-secondary-light-gray mt-5 mb-5 p-1">
          <li className="bg-white	 text-center w-1/2 rounded p-2 cursor-pointer">
            Buy
          </li>
          <li className="text-center w-1/2 rounded p-2 cursor-pointer">Sell</li>
        </ul>

        <div className="flex gap-4">
          <TextField
            type="number"
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
          />
          <TextField
            type="number"
            id="outlined-basic"
            label="Price Per Coin"
            variant="outlined"
          />
        </div>
        <div className="w-full mt-5 bg-secondary-light-gray rounded p-3">
          <p className="text-secondary-text font text-sm">Total Spent</p>
          <p className="font-bold text-xl mt-2">$0</p>
        </div>

        <Button className="mt-5" variant="contained">
          Add Transaction
        </Button>
      </Box>
    </Modal>
  )
}
